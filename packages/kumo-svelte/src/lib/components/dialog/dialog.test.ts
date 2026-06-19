import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import DialogTestHost from './DialogTestHost.svelte';

describe('Dialog', () => {
  it('renders the trigger with Kumo data attributes', () => {
    render(DialogTestHost);

    const trigger = screen.getByRole('button', { name: 'Open dialog' });
    expect(trigger.getAttribute('data-kumo-component')).toBe('Dialog');
    expect(trigger.getAttribute('data-kumo-part')).toBe('trigger');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens on trigger click and updates trigger state', async () => {
    const user = userEvent.setup();

    render(DialogTestHost);

    const trigger = screen.getByRole('button', { name: 'Open dialog' });
    expect(trigger.getAttribute('aria-expanded')).toBe('false');

    await user.click(trigger);

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(trigger.getAttribute('data-state')).toBe('open');
    // Dialog content, backdrop, and focus trap are covered by VRT.
  });

  it('activates via keyboard on trigger', async () => {
    const user = userEvent.setup();

    render(DialogTestHost);

    const trigger = screen.getByRole('button', { name: 'Open dialog' });
    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    await user.keyboard('{Enter}');
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  describe('variant fidelity', () => {
    it('applies Dialog trigger part and button ring classes', () => {
      render(DialogTestHost);

      const trigger = screen.getByRole('button', { name: 'Open dialog' });
      expect(trigger.getAttribute('data-kumo-component')).toBe('Dialog');
      expect(trigger.getAttribute('data-kumo-part')).toBe('trigger');
      expect(trigger.className).toContain('ring-kumo-line');
      // Dialog content size and backdrop classes are covered by VRT.
    });
  });

  describe('accessibility', () => {
    it('has no axe violations when closed', async () => {
      const { container } = render(DialogTestHost);
      await expectNoA11yViolations(container);
    });
  });
});
