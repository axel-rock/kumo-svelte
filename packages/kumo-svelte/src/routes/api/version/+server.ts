import { json } from '@sveltejs/kit';

export function GET() {
  return json({
    kumoVersion: __KUMO_VERSION__,
    docsVersion: __DOCS_VERSION__,
    buildDate: __BUILD_DATE__
  });
}
