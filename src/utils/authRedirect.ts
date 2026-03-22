/**
 * Safe internal redirects after login / onboarding (open-redirect safe).
 */

const VALID_REDIRECT_PATHS = [
  '/home',
  '/journal',
  '/progress',
  '/profile',
  '/training',
  '/lessons',
  '/study',
  '/leaders',
  '/friends',
];

export function getPostLoginDestination(searchParams: URLSearchParams): string {
  const redirect = searchParams.get('redirect');
  if (!redirect) return '/home';
  const decoded = decodeURIComponent(redirect);
  const isValid = VALID_REDIRECT_PATHS.some(
    (p) => decoded === p || decoded.startsWith(`${p}/`),
  );
  return isValid ? decoded : '/home';
}
