/**
 * Pastoral Phase Store
 * Sprint 12 - Initial stabilization and rhythm phases
 * Sprint 13 - Understanding and belonging phases
 * Sprint 14 - Integration and abiding phases (FINAL)
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * IMPORTANT: THIS IS CONTEXTUAL, NOT PROGRESS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Pastoral phase is NOT:
 *   - A level or achievement
 *   - Something the user sees or "unlocks"
 *   - A measure of spiritual worthiness
 *   - A gamification mechanic
 * 
 * Pastoral phase IS:
 *   - Internal context for adapting tone and UX
 *   - A way to reduce anxiety, not increase it
 *   - Invisible to the user — they never see "Phase 1" or "Phase 2"
 * 
 * The phase affects only:
 *   - Language/copy shown (more reassuring in 'stabilizing')
 *   - Visual density (more white space in 'stabilizing')
 *   - Tone of messages (permission, not instruction)
 *   - Sprint 13: Questions instead of statements in deeper phases
 *   - Sprint 14: Intentional withdrawal — the app steps back
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * ETHICAL BOUNDARIES
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This store does NOT:
 *   - Track usage patterns or frequency
 *   - Measure "engagement" or "retention"
 *   - Auto-advance based on metrics
 *   - Connect to analytics or backend
 * 
 * Phase transitions are:
 *   - Manual and intentional (for future development)
 *   - Never automatic based on usage tracking
 *   - Designed to be controlled by pastoral judgment, not algorithms
 * 
 * ISOLATION RULES:
 *   - DO NOT import from /core/identity/
 *   - DO NOT import from /core/memory/
 *   - DO NOT import from /core/journey/
 *   - This domain must remain independent
 * 
 * @see /docs/ETHICAL_BOUNDARIES.md
 * ═══════════════════════════════════════════════════════════════════════════
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * Pastoral phases for member accompaniment.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * PHASE DESCRIPTIONS (COMPLETE)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 'stabilizing' — First weeks/months after baptism (Sprint 12)
 *   - User may feel overwhelmed or anxious
 *   - UX should be calming, reassuring
 *   - Message: "There's no rush. Breathe."
 *   - Tone: Permission, not instruction
 * 
 * 'rhythm' — After initial stabilization (Sprint 12)
 *   - User is finding their sustainable pace
 *   - UX can introduce gentle consistency themes
 *   - Message: "Consistency matters more than intensity."
 *   - Tone: Encouragement without pressure
 * 
 * 'understanding' — Connecting doctrine to life (Sprint 13)
 *   - User starts asking "why" questions
 *   - UX shifts from messages to questions
 *   - Question: "What has helped you stay close to the Savior?"
 *   - Tone: Reflection over instruction
 *   - Journal becomes central
 * 
 * 'belonging' — Feeling part of community (Sprint 13)
 *   - User seeks connection without performance
 *   - UX emphasizes presence over doing
 *   - Question: "Where do you feel most at home in your faith?"
 *   - Tone: Belonging without evaluation
 *   - More silence, fewer prompts
 * 
 * 'integration' — Faith as identity (Sprint 14)
 *   - User's faith is woven into daily life
 *   - UX becomes minimal — the app steps back
 *   - Message: "Your faith is already part of your life."
 *   - Tone: Affirmation of integration
 *   - The app no longer tries to guide
 * 
 * 'abiding' — Mature, quiet faith (Sprint 14)
 *   - User has internalized their spiritual practice
 *   - UX is almost invisible — maximum silence
 *   - Message: "Remain." (or nothing at all)
 *   - Tone: Presence without words
 *   - The app exists only when sought
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * SPRINT 14: INTENTIONAL WITHDRAWAL
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * In 'integration' and 'abiding' phases, the app INTENTIONALLY reduces
 * its presence. This is not missing content — it is a design decision.
 * 
 * Philosophy:
 *   "The app should not compete with lived faith."
 * 
 * The goal is for the user to feel:
 *   "I don't need this app... but I know it's here."
 * 
 * This is the highest form of pastoral accompaniment:
 * being present without being intrusive.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */
export type PastoralPhase = 
  | 'stabilizing' 
  | 'rhythm' 
  | 'understanding' 
  | 'belonging'
  | 'integration'
  | 'abiding';

interface PastoralPhaseState {
  /**
   * Current pastoral phase.
   * Default: 'stabilizing' for new members.
   */
  phase: PastoralPhase;
  
  /**
   * Advance to the next pastoral phase.
   * 
   * ═══════════════════════════════════════════════════════════════════════
   * ETHICAL TRANSITION POLICY
   * ═══════════════════════════════════════════════════════════════════════
   * 
   * This function is NOT exposed in UI.
   * It exists ONLY for future pastoral/ethical activation.
   * 
   * VALID activation paths (future):
   *   - Manual decision by pastoral leadership
   *   - User-initiated "I feel ready" (never prompted)
   *   - Time-based suggestion (never automatic)
   * 
   * INVALID activation paths (never):
   *   - Automatic based on usage metrics
   *   - Triggered by "engagement" data
   *   - Forced by algorithm
   * 
   * The transition should feel like:
   *   "The app noticed I've been here a while and gently adjusted"
   * NOT like:
   *   "I unlocked level 3!"
   * 
   * For 'integration' and 'abiding' phases:
   *   The app becomes quieter, not more rewarding.
   *   Reaching 'abiding' is not an achievement — it's a natural state.
   * 
   * ═══════════════════════════════════════════════════════════════════════
   */
  advancePastoralPhase: () => void;
  
  /**
   * Set phase directly (for development/testing only).
   * In production, prefer advancePastoralPhase().
   */
  setPhase: (phase: PastoralPhase) => void;
  
  /**
   * Reset to default state.
   * Used when clearing user data.
   */
  resetPhase: () => void;
}

/**
 * Phase progression order (COMPLETE).
 * Linear progression reflects natural spiritual development.
 * 
 * Note: Users may not progress linearly in real life,
 * but the app's default path is designed for gentle accompaniment.
 * 
 * The final phases ('integration', 'abiding') represent the app
 * stepping back — not the user "completing" something.
 */
const PHASE_ORDER: PastoralPhase[] = [
  'stabilizing',
  'rhythm',
  'understanding',
  'belonging',
  'integration',
  'abiding',
];

export const usePastoralPhaseStore = create<PastoralPhaseState>()(
  persist(
    (set, get) => ({
      // Default: new members start in 'stabilizing'
      phase: 'stabilizing',

      advancePastoralPhase: () => {
        const currentPhase = get().phase;
        const currentIndex = PHASE_ORDER.indexOf(currentPhase);
        const nextIndex = currentIndex + 1;
        
        // Only advance if there's a next phase
        if (nextIndex < PHASE_ORDER.length) {
          set({ phase: PHASE_ORDER[nextIndex] });
        }
        // If already at 'abiding', do nothing
        // This is the final resting state — not an endpoint to celebrate
      },

      setPhase: (phase: PastoralPhase) => {
        set({ phase });
      },

      resetPhase: () => {
        set({ phase: 'stabilizing' });
      },
    }),
    {
      name: 'pastoral-phase-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/**
 * Convenience hook for current phase.
 * Use this in components to adapt UX based on pastoral context.
 */
export function usePastoralPhase(): PastoralPhase {
  return usePastoralPhaseStore((s) => s.phase);
}

/**
 * Check if current phase uses questions instead of statements.
 * Understanding and belonging phases use reflective questions.
 */
export function useIsReflectivePhase(): boolean {
  const phase = usePastoralPhase();
  return phase === 'understanding' || phase === 'belonging';
}

/**
 * Check if current phase is in withdrawal mode.
 * Integration and abiding phases intentionally reduce app presence.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * SPRINT 14: WITHDRAWAL PHASES
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * When this returns true:
 *   - UI should be minimal (fewer cards, less text)
 *   - Messages should be brief or absent
 *   - No prompts, no CTAs, no guidance
 *   - The app exists only as a quiet presence
 * 
 * This is intentional design, not missing content.
 * ═══════════════════════════════════════════════════════════════════════════
 */
export function useIsWithdrawalPhase(): boolean {
  const phase = usePastoralPhase();
  return phase === 'integration' || phase === 'abiding';
}

/**
 * Check if current phase is the final 'abiding' state.
 * In this phase, the app is almost silent.
 */
export function useIsAbidingPhase(): boolean {
  const phase = usePastoralPhase();
  return phase === 'abiding';
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PASTORAL MESSAGES (i18n)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Copy lives in app.es.json / app.en.json under `app.pastoral.<group>.<phase>`.
 * Use `getPastoralMessagePath` + I18n `t()` in components so locale matches UI.
 *
 * Note: In integration/abiding phases, many strings are empty — intentional silence.
 * ═══════════════════════════════════════════════════════════════════════════
 */
export const PASTORAL_MESSAGE_GROUPS = [
  'homeWelcome',
  'encouragement',
  'continueStudy',
  'progressHeader',
  'progressEmpty',
  'journalInvite',
  'belongingAffirmation',
  'progressPermanence',
] as const;

export type PastoralMessageGroup = (typeof PASTORAL_MESSAGE_GROUPS)[number];

/**
 * i18n path for pastoral copy, e.g. app.pastoral.homeWelcome.stabilizing
 */
export function getPastoralMessagePath(
  group: PastoralMessageGroup,
  phase: PastoralPhase
): string {
  return `app.pastoral.${group}.${phase}`;
}

/**
 * Check if the home content is a question (understanding/belonging).
 * Used to adjust typography and layout.
 */
export function isHomeContentQuestion(phase: PastoralPhase): boolean {
  return phase === 'understanding' || phase === 'belonging';
}

/**
 * Check if home should show minimal content (integration/abiding).
 * In these phases, home is deliberately sparse.
 */
export function isHomeMinimal(phase: PastoralPhase): boolean {
  return phase === 'integration' || phase === 'abiding';
}
