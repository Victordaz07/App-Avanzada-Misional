/**
 * Recomendaciones soft de nodos de capacitación según llamamiento de Líderes.
 * Los IDs deben existir en paths o tracksById (validar con getNodeById).
 */

import type { LeadershipRole } from '../../../leaders/config/roles';

const BISHOPRIC_WIDE: readonly string[] = [
  'core-foundations',
  'teaching-saviors-way',
  'priesthood',
  'auxiliary-organizations',
];

const BY_ROLE: Record<LeadershipRole, readonly string[]> = {
  bishop: BISHOPRIC_WIDE,
  first_counselor_bishopric: BISHOPRIC_WIDE,
  second_counselor_bishopric: BISHOPRIC_WIDE,
  ward_clerk: BISHOPRIC_WIDE,
  executive_secretary: BISHOPRIC_WIDE,
  elders_quorum_president: [
    'teaching-saviors-way',
    'org-elders-quorum',
    'melchizedek-elder',
  ],
  relief_society_president: ['teaching-saviors-way', 'org-relief-society'],
  sunday_school_president: ['teaching-saviors-way', 'org-sunday-school'],
  young_women_president: ['teaching-saviors-way', 'org-young-women'],
  young_men_president: ['teaching-saviors-way', 'org-aaronic'],
  primary_president: ['teaching-saviors-way', 'org-primary'],
  ward_mission_leader: ['core-foundations', 'teaching-saviors-way'],
  other_leader: ['core-foundations', 'teaching-saviors-way'],
};

/** Nodos recomendados para el hub /training (orden estable, sin duplicados). */
export function getRecommendedTrainingNodeIds(role: LeadershipRole | null): string[] {
  if (!role) return [];
  const raw = BY_ROLE[role];
  if (!raw?.length) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const id of raw) {
    if (!seen.has(id)) {
      seen.add(id);
      out.push(id);
    }
  }
  return out;
}
