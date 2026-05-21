import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const VIRTUAL_MODULE_ID = 'virtual:kumo-registry';
const RESOLVED_VIRTUAL_MODULE_ID = `\0${VIRTUAL_MODULE_ID}`;

export function kumoRegistryPlugin() {
  const registryFiles = {
    markdown: resolve(__dirname, '../../../ai/component-registry.md'),
    json: resolve(__dirname, '../../../ai/component-registry.json')
  };

  return {
    name: 'vite-plugin-kumo-registry',

    resolveId(id: string) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }
    },

    async load(id: string) {
      if (id !== RESOLVED_VIRTUAL_MODULE_ID) return;

      const [markdown, json] = await Promise.all([
        readFile(registryFiles.markdown, 'utf8').catch(() => ''),
        readFile(registryFiles.json, 'utf8')
      ]);

      return `
export const kumoRegistryMarkdown = ${JSON.stringify(markdown)};
export const kumoRegistryJson = ${json};
`;
    },

    configureServer(server: {
      watcher: {
        add: (paths: string[]) => void;
        on: (event: string, callback: (file: string) => void) => void;
      };
      moduleGraph: {
        getModuleById: (id: string) => unknown;
        invalidateModule: (mod: unknown) => void;
      };
      ws: { send: (message: { type: string }) => void };
    }) {
      const registryFilePaths = Object.values(registryFiles);

      server.watcher.add(registryFilePaths);

      server.watcher.on('change', (file: string) => {
        if (registryFilePaths.some((registryFile) => file.endsWith(registryFile.split('/').pop()!))) {
          const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID);
          if (mod) {
            server.moduleGraph.invalidateModule(mod);
            server.ws.send({ type: 'full-reload' });
          }
        }
      });
    }
  };
}
