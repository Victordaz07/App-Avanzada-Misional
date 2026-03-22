/** Paths reachable while Firebase user exists but onboarding is not finished. */
export const ONBOARDING_ALLOWED_PREFIXES = [
  '/onboarding',
  '/privacy',
  '/terms',
  '/support',
  '/welcome',
  '/register',
  '/login',
] as const;

export function pathAllowsIncompleteProfile(pathname: string): boolean {
  return ONBOARDING_ALLOWED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}
