/**
 * Valores almacenados en Firestore (classWithinOrganization) según tipo de organización.
 * Las etiquetas visibles viven en i18n: leadership.canon.sessionClassOption.<value>
 */

import type { CallingType } from '../types';

export const CLASS_WITHIN_ORG_OPTIONS: Record<CallingType, readonly string[]> = {
  quorum: [
    'quorum_deacon',
    'quorum_teacher',
    'quorum_priest',
    'elders_quorum',
    'high_priests_group',
    'young_men_combined',
  ],
  sunday_school: [
    'ss_gospel_doctrine',
    'ss_course_youth',
    'ss_course_adult',
    'ss_come_follow_me',
    'ss_other',
  ],
  seminary: [
    'seminary_morning',
    'seminary_home_study',
    'seminary_online',
    'seminary_other',
  ],
  relief_society: ['rs_general', 'rs_young_adult', 'rs_other'],
  primary: [
    'primary_sunbeams',
    'primary_ctr_7_8',
    'primary_ctr_9_10',
    'primary_valiant',
    'primary_other',
  ],
  other: [],
};

export function resolveClassWithinOrgLabel(
  t: (path: string) => string,
  value: string | undefined
): string | null {
  if (!value?.trim()) return null;
  const key = `leadership.canon.sessionClassOption.${value}`;
  const resolved = t(key);
  if (resolved !== key) return resolved;
  return value;
}
