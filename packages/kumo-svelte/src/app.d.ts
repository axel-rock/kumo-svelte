declare module '*.css';
declare module '*?raw' {
  const content: string;
  export default content;
}

declare const __KUMO_VERSION__: string;
declare const __DOCS_VERSION__: string;
declare const __BUILD_DATE__: string;
