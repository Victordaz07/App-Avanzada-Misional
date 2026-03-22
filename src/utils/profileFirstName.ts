import type { UniversalUserProfile } from '../types/user';

/** First name for greetings: `firstName`, else first word of `displayName`. */
export function firstWelcomeName(profile: UniversalUserProfile | null): string | null {
  if (!profile) return null;
  const fromFirst = profile.firstName?.trim();
  if (fromFirst) return fromFirst;
  const dn = profile.displayName?.trim();
  if (!dn) return null;
  const word = dn.split(/\s+/)[0];
  return word || null;
}

export function initialsFromDisplayName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function splitDisplayName(displayName: string): { firstName: string; lastName: string } {
  const trimmed = displayName.trim().replace(/\s+/g, ' ');
  const parts = trimmed.split(' ');
  return {
    firstName: parts[0] ?? '',
    lastName: parts.slice(1).join(' '),
  };
}
