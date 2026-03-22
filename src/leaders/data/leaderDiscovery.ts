import { leadersAppUrl } from '../leadersPaths';
import { getLocalDayIndex } from '../../utils/localDayIndex';

export type LeaderDiscoverySlotId =
  | 'callings'
  | 'members'
  | 'teaching'
  | 'calendar'
  | 'responsibilities'
  | 'notes';

const SLOT_ORDER: LeaderDiscoverySlotId[] = [
  'callings',
  'members',
  'teaching',
  'calendar',
  'responsibilities',
  'notes',
];

function rotate<T>(arr: readonly T[], offset: number): T[] {
  const n = arr.length;
  if (n === 0) return [];
  const o = ((offset % n) + n) % n;
  return [...arr.slice(o), ...arr.slice(0, o)];
}

export function selectLeaderDiscoverySlots(
  dayIndex: number,
  max = 3
): LeaderDiscoverySlotId[] {
  const rotated = rotate(SLOT_ORDER, dayIndex % SLOT_ORDER.length);
  return rotated.slice(0, max);
}

export function leaderDiscoveryHref(id: LeaderDiscoverySlotId): string {
  switch (id) {
    case 'callings':
      return leadersAppUrl('callings');
    case 'members':
      return leadersAppUrl('members');
    case 'teaching':
      return leadersAppUrl('teaching');
    case 'calendar':
      return leadersAppUrl('calendar');
    case 'responsibilities':
      return leadersAppUrl('responsibilities');
    case 'notes':
      return leadersAppUrl('notes');
  }
}

export { getLocalDayIndex };
