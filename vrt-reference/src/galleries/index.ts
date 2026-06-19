import type { ComponentType } from 'react';
import { ButtonGallery } from './button';

/**
 * Registry of React reference galleries, keyed by component slug. Add an entry
 * here (mirroring the Svelte gallery's scenario ids) to enable cross-framework
 * parity checks for that component.
 */
export const GALLERIES: Record<string, ComponentType> = {
  button: ButtonGallery,
};
