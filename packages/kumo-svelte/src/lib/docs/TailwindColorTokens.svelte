<script lang="ts">
  type TokenGroup = {
    title: string;
    tokens: string[];
  };

  const tokenGroups: TokenGroup[] = [
    {
      title: 'Text Colors',
      tokens: [
        '--text-color-kumo-default',
        '--text-color-kumo-inverse',
        '--text-color-kumo-strong',
        '--text-color-kumo-subtle',
        '--text-color-kumo-inactive',
        '--text-color-kumo-placeholder',
        '--text-color-kumo-brand',
        '--text-color-kumo-link',
        '--text-color-kumo-info',
        '--text-color-kumo-success',
        '--text-color-kumo-danger',
        '--text-color-kumo-warning'
      ]
    },
    {
      title: 'Surface, State & Theme Colors',
      tokens: [
        '--color-kumo-canvas',
        '--color-kumo-elevated',
        '--color-kumo-recessed',
        '--color-kumo-base',
        '--color-kumo-tint',
        '--color-kumo-contrast',
        '--color-kumo-overlay',
        '--color-kumo-control',
        '--color-kumo-interact',
        '--color-kumo-fill',
        '--color-kumo-fill-hover',
        '--color-kumo-brand',
        '--color-kumo-brand-hover',
        '--color-kumo-line',
        '--color-kumo-hairline',
        '--color-kumo-focus',
        '--color-kumo-shadow-edge',
        '--color-kumo-shadow-drop',
        '--color-kumo-tip-shadow',
        '--color-kumo-tip-stroke',
        '--color-kumo-info-tint',
        '--color-kumo-info',
        '--color-kumo-warning-tint',
        '--color-kumo-warning',
        '--color-kumo-danger-tint',
        '--color-kumo-danger',
        '--color-kumo-success-tint',
        '--color-kumo-success'
      ]
    },
    {
      title: 'Badge Colors',
      tokens: [
        '--text-color-kumo-badge-orange-subtle',
        '--text-color-kumo-badge-teal-subtle',
        '--text-color-kumo-badge-neutral-subtle',
        '--text-color-kumo-badge-inverted',
        '--color-kumo-badge-red',
        '--color-kumo-badge-orange',
        '--color-kumo-badge-orange-subtle',
        '--color-kumo-badge-purple',
        '--color-kumo-badge-green',
        '--color-kumo-badge-teal',
        '--color-kumo-badge-teal-subtle',
        '--color-kumo-badge-blue',
        '--color-kumo-badge-neutral',
        '--color-kumo-badge-inverted'
      ]
    }
  ];

  const tokenCount = tokenGroups.reduce((count, group) => count + group.tokens.length, 0);
</script>

<section class="not-prose my-8 space-y-8">
  <div>
    <h2 class="text-2xl font-semibold tracking-normal text-kumo-strong">Colors</h2>
    <p class="mt-2 text-sm text-kumo-subtle">Displaying {tokenCount} tokens</p>
  </div>

  {#each tokenGroups as group}
    <section class="space-y-3">
      <h3 class="text-lg font-semibold tracking-normal text-kumo-strong">
        {group.title} ({group.tokens.length})
      </h3>

      <div class="overflow-hidden rounded-lg border border-kumo-hairline bg-kumo-base">
        {#each group.tokens as token}
          <div
            class="grid gap-3 border-b border-kumo-hairline p-4 last:border-b-0 sm:grid-cols-[minmax(16rem,1fr)_minmax(11rem,14rem)_minmax(11rem,14rem)] sm:items-center"
          >
            <code class="text-sm text-kumo-default">{token}</code>

            <div data-mode="light" class="flex items-center gap-3">
              <span
                class="size-8 shrink-0 rounded border border-kumo-hairline shadow-xs"
                style:background-color={`var(${token})`}
              ></span>
              <span class="text-sm text-kumo-subtle">Light</span>
            </div>

            <div data-mode="dark" class="flex items-center gap-3">
              <span
                class="size-8 shrink-0 rounded border border-kumo-hairline shadow-xs"
                style:background-color={`var(${token})`}
              ></span>
              <span class="text-sm text-kumo-subtle">Dark</span>
            </div>
          </div>
        {/each}
      </div>
    </section>
  {/each}
</section>
