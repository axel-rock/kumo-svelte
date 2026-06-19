import type { ReactNode } from 'react';

/**
 * Mirrors the Svelte `Scenario.svelte` wrapper so the parity runner can match
 * scenarios across frameworks by `data-vr-scenario` id.
 */
export function Scenario({
  id,
  label,
  children,
}: {
  id: string;
  label?: string;
  children: ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {label ? (
        <div
          data-vr-ignore
          style={{
            fontSize: 11,
            lineHeight: 1,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            color: 'var(--text-color-kumo-subtle)',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
          }}
        >
          {label}
        </div>
      ) : null}
      <div data-vr-scenario={id} style={{ width: 'max-content', maxWidth: '100%' }}>
        {children}
      </div>
    </div>
  );
}
