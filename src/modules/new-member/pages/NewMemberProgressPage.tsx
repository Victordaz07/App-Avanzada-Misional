import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaPenToSquare } from 'react-icons/fa6';
import { useSpiritualMemoryStore, useHasJournalActivity } from '../../../core/memory/useSpiritualMemoryStore';
import { useInvestigatorStore } from '../../investigator/store/useInvestigatorStore';
import { useI18n } from '../../../context/I18nContext';
import { 
  usePastoralPhase, 
  getPastoralMessagePath,
  useIsReflectivePhase,
  useIsWithdrawalPhase,
  useIsAbidingPhase
} from '../../../core/pastoral/usePastoralPhaseStore';
import './NewMemberProgressPage.css';

/**
 * New Member Progress Page
 * 
 * Sprint 8 – Spiritual Memory: gentle reflection messages
 * Sprint 12 – Pastoral Phase: adapts tone and silence based on phase
 * Sprint 13 – Understanding/Belonging: presence over activity, no performance
 * Sprint 14 – Integration/Abiding: permanence message, intentional withdrawal
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * PASTORAL UX PRINCIPLES
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This page is NOT about measuring progress.
 * It's about honoring presence and affirming the journey.
 * 
 * ❌ NO numeric metrics or percentages
 * ❌ NO "you've completed X of Y"
 * ❌ NO comparison language
 * ❌ NO achievement framing
 * ❌ NO performance evaluation
 * 
 * ✅ Language of presence ("you've been here")
 * ✅ Language of process ("your journey is unfolding")
 * ✅ More visual silence in earlier phases
 * ✅ Fewer elements, more breathing room
 * ✅ Belonging affirmation in deeper phases
 * ✅ Single permanence message in final phases (Sprint 14)
 * 
 * Phase behavior:
 *   - stabilizing/rhythm: Gentle acknowledgment of activity
 *   - understanding/belonging: Affirmation of presence, not doing
 *   - integration/abiding: Single message of permanence
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * SPRINT 14: INTENTIONAL WITHDRAWAL
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * In 'integration' and 'abiding' phases, this page becomes almost empty.
 * A single message affirms that faith is lived, not finished.
 * 
 * "Faith isn't something you finish. It's something you live."
 * "You're living it."
 * 
 * This is NOT missing content — it is a design decision.
 * The app steps back because the user has integrated their faith.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */
export default function NewMemberProgressPage(): JSX.Element {
  const { t } = useI18n();
  const { isHydrated, hydrate, lastLessonTitle } = useSpiritualMemoryStore();
  const { journalEntries } = useInvestigatorStore();
  const hasReflectionActivity = useHasJournalActivity();
  const phase = usePastoralPhase();
  const isReflective = useIsReflectivePhase();
  const isWithdrawal = useIsWithdrawalPhase();
  const isAbiding = useIsAbidingPhase();

  // Hydrate memory on mount
  useEffect(() => {
    if (!isHydrated) {
      hydrate();
    }
  }, [isHydrated, hydrate]);

  const hasJournalEntries = journalEntries.length > 0;
  const hasExploredGuide = isHydrated && lastLessonTitle;

  // Check if there's any activity to show
  const hasActivity = hasReflectionActivity || hasExploredGuide || hasJournalEntries;

  // In withdrawal phases, show minimal content
  if (isWithdrawal) {
    const permanenceMessage = t(getPastoralMessagePath('progressPermanence', phase));
    const header = t(getPastoralMessagePath('progressHeader', phase));
    
    return (
      <div className={`nm-progress nm-progress--${phase}`}>
        {/* 
          SPRINT 14: PERMANENCE PAGE
          
          In integration/abiding phases, this page shows only
          a single message affirming that faith is lived, not measured.
          
          This is intentional design, not missing content.
        */}
        
        {/* Header — minimal or absent */}
        {header && (
          <header className="nm-progress__header nm-progress__header--minimal">
            <h1 className="nm-progress__title nm-progress__title--minimal">
              {header}
            </h1>
          </header>
        )}
        
        {/* Single permanence message */}
        <section className="nm-progress__permanence">
          <p className="nm-progress__permanence-text">
            {permanenceMessage.split('\n')[0]}
          </p>
          {permanenceMessage.includes('\n') && (
            <p className="nm-progress__permanence-text nm-progress__permanence-text--secondary">
              {permanenceMessage.split('\n')[1]}
            </p>
          )}
        </section>
        
        {/* 
          No activity tracking in withdrawal phases.
          The user's faith is lived, not logged.
        */}
      </div>
    );
  }

  // Earlier phases: full content
  const getSubtitle = () => {
    if (phase === 'belonging') {
      return t('app.newMemberProgress.subtitleBelonging');
    }
    if (phase === 'understanding') {
      return t('app.newMemberProgress.subtitleUnderstanding');
    }
    return t('app.newMemberProgress.subtitleDefault');
  };

  const getFooterMessage = () => {
    if (phase === 'belonging') {
      return t(getPastoralMessagePath('belongingAffirmation', phase));
    }
    if (phase === 'understanding') {
      return t('app.newMemberProgress.footerUnderstanding');
    }
    return t('app.newMemberProgress.footerDefault');
  };

  const progressEmptyRaw = t(getPastoralMessagePath('progressEmpty', phase));
  const progressEmptyLines = progressEmptyRaw.split('\n');

  return (
    <div className={`nm-progress nm-progress--${phase}`}>
      {/* Header — Phase-aware language */}
      <header className="nm-progress__header">
        <h1 className="nm-progress__title">
          {t(getPastoralMessagePath('progressHeader', phase))}
        </h1>
        <p className="nm-progress__subtitle">
          {getSubtitle()}
        </p>
      </header>

      {/* Recent Experiences */}
      <section className="nm-progress__experiences">
        {hasActivity ? (
          <div className="nm-progress__moments">
            {hasExploredGuide && (
              <div className="nm-progress__moment">
                <span className="nm-progress__moment-icon">📖</span>
                <p className="nm-progress__moment-text">
                  {isReflective 
                    ? t('app.newMemberProgress.momentGuideReflective')
                    : t('app.newMemberProgress.momentGuideCalm')}
                </p>
              </div>
            )}
            {(hasReflectionActivity || hasJournalEntries) && (
              <div className="nm-progress__moment">
                <span className="nm-progress__moment-icon">✍️</span>
                <p className="nm-progress__moment-text">
                  {isReflective 
                    ? t('app.newMemberProgress.momentJournalReflective')
                    : t('app.newMemberProgress.momentJournalCalm')}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="nm-progress__empty">
            <p className="nm-progress__empty-text">
              {progressEmptyLines[0]}
            </p>
            {progressEmptyLines.length > 1 && progressEmptyLines[1] && (
            <p className="nm-progress__empty-text nm-progress__empty-text--secondary">
              {progressEmptyLines[1]}
            </p>
            )}
            
            {/* In reflective phases, Journal is the primary suggestion */}
            {isReflective ? (
              <Link to="/journal" className="nm-progress__empty-action nm-progress__empty-action--journal">
                <FaPenToSquare /> {t('app.newMemberProgress.emptyJournalCta')}
              </Link>
            ) : (
              <Link to="/lessons" className="nm-progress__empty-action">
                <FaBookOpen /> {t('app.progress.nextSteps')}
              </Link>
            )}
          </div>
        )}
      </section>

      {/* 
        Belonging Affirmation (Sprint 13)
        
        In understanding/belonging phases, we add a gentle affirmation
        that reinforces belonging without any implication of performance.
      */}
      {isReflective && hasActivity && (
        <section className="nm-progress__belonging">
          <p className="nm-progress__belonging-text">
            {t(getPastoralMessagePath('belongingAffirmation', phase))}
          </p>
        </section>
      )}

      {/* Closing reflection */}
      <footer className="nm-progress__footer">
        <p className="nm-progress__footer-text">
          {getFooterMessage()}
        </p>
        {!isReflective && (
          <p className="nm-progress__footer-text nm-progress__footer-text--secondary">
            {t('app.newMemberProgress.footerSaviorAlways')}
          </p>
        )}
      </footer>
    </div>
  );
}
