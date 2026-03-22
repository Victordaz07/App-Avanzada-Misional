/** Base paths when the leaders app is mounted inside the main SPA */
export const LEADERS_ROOT = '/leaders';
export const LEADERS_APP = `${LEADERS_ROOT}/app`;

/** SPA embebida bajo /leaders/* vs entry standalone (rutas en raíz). */
export function leadersIsEmbeddedPath(pathname: string): boolean {
  return pathname.startsWith(`${LEADERS_ROOT}/`);
}

/** Base para tabs: `/leaders/app` embebido, o `''` en standalone (dashboard en `/`). */
export function leadersAppBaseFromLocation(pathname: string): string {
  return leadersIsEmbeddedPath(pathname) ? LEADERS_APP : '';
}

/** Destino de tab: home, callings, teaching, members, profile. */
export function leadersTabPath(
  tabId: 'home' | 'callings' | 'teaching' | 'members' | 'profile',
  pathname: string,
): string {
  const base = leadersAppBaseFromLocation(pathname);
  if (tabId === 'home') {
    return base || '/';
  }
  const segment = tabId;
  return base ? `${base}/${segment}` : `/${segment}`;
}

/** Path under /leaders/app (pass e.g. `teaching`, `/callings`, `members/x`) */
export function leadersAppUrl(segment: string): string {
  if (!segment || segment === '/') return LEADERS_APP;
  const s = segment.startsWith('/') ? segment : `/${segment}`;
  return `${LEADERS_APP}${s}`;
}

export function leadersRootUrl(segment: string): string {
  if (!segment || segment === '/') return LEADERS_ROOT;
  const s = segment.startsWith('/') ? segment : `/${segment}`;
  return `${LEADERS_ROOT}${s}`;
}
