import { json } from '@sveltejs/kit';
import registry from '../../../../ai/component-registry.json';

export function GET() {
  return json(registry);
}
