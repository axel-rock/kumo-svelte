const PENDING_MIGRATIONS: Record<string, string> = {};

const MIGRATE_HELP = `
Kumo Svelte token migration helper

Usage:
  kumo-svelte migrate             Output token rename map as JSON
  kumo-svelte migrate --classes   Output class-level mappings
  kumo-svelte migrate --to-old    Reverse migration direction
  kumo-svelte migrate --help      Show this help
`;

function generateClassMap(): Record<string, string> {
  const classes: Record<string, string> = {};
  for (const [oldToken, newToken] of Object.entries(PENDING_MIGRATIONS)) {
    for (const prefix of ['bg', 'text', 'border', 'ring', 'from', 'via', 'to', 'fill', 'stroke']) {
      classes[`${prefix}-${oldToken}`] = `${prefix}-${newToken}`;
    }
  }
  return classes;
}

export function migrate(args: string[]): void {
  if (args.includes('--help') || args.includes('-h')) {
    console.log(MIGRATE_HELP.trim());
    return;
  }

  if (Object.keys(PENDING_MIGRATIONS).length === 0) {
    console.log('No pending token migrations.');
    console.log('');
    console.log('Your codebase is up to date with the current Kumo Svelte version.');
    return;
  }

  const classes = generateClassMap();
  if (args.includes('--classes')) {
    for (const [from, to] of Object.entries(classes)) {
      console.log(`${from} -> ${to}`);
    }
    return;
  }

  console.log(
    JSON.stringify(
      {
        meta: {
          description: 'Kumo Svelte token class name migration map',
          direction: args.includes('--to-old') ? 'to-old' : 'to-new',
          generatedAt: new Date().toISOString()
        },
        tokens: PENDING_MIGRATIONS,
        classes
      },
      null,
      2
    )
  );
}
