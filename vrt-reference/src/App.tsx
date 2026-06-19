import { useEffect, useState } from 'react';
import { GALLERIES } from './galleries';

/**
 * Routes:
 *   /                -> index of available reference galleries
 *   /r/<component>   -> renders the component gallery (mirrors /vrt/<component>)
 * Dark mode via `?mode=dark` (sets [data-mode="dark"], matching Kumo).
 */
export function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    const mode = new URLSearchParams(window.location.search).get('mode');
    const root = document.documentElement;
    if (mode === 'dark') root.setAttribute('data-mode', 'dark');
    else root.removeAttribute('data-mode');
    root.style.colorScheme = mode === 'dark' ? 'dark' : 'light';
  }, [path]);

  const match = path.match(/^\/r\/([^/]+)/);
  const slug = match?.[1];

  if (slug) {
    const Gallery = GALLERIES[slug];
    return (
      <main
        data-vr-page={slug}
        data-vr-ready="true"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '2rem',
          padding: '2rem',
        }}
      >
        {Gallery ? <Gallery /> : <p>No reference gallery for "{slug}".</p>}
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '48rem', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
        Kumo React reference (VRT parity)
      </h1>
      <ul>
        {Object.keys(GALLERIES)
          .sort()
          .map((s) => (
            <li key={s}>
              <a href={`/r/${s}`} style={{ color: 'var(--text-color-kumo-link)' }}>
                {s}
              </a>
            </li>
          ))}
      </ul>
    </main>
  );
}
