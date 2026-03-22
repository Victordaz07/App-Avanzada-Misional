import React, { useEffect, useId, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  FaChevronRight,
  FaPenToSquare,
  FaGraduationCap,
  FaChurch,
  FaDroplet,
  FaHeart,
  FaPeopleGroup,
  FaBookOpen,
} from 'react-icons/fa6';
import { useAuth } from '../../../context/AuthContext';
import { useSpiritualMemoryStore } from '../../../core/memory/useSpiritualMemoryStore';
import { useI18n } from '../../../context/I18nContext';
import HomeDiscoveryRails from '../../../ui/home-discovery/HomeDiscoveryRails';
import { HomeWelcomeCard } from '../../../ui/home-welcome/HomeWelcomeCard';
import { getLocalDayIndex } from '../../../utils/localDayIndex';
import { getLocalWeekIndex } from '../../../utils/localWeekIndex';
import { firstWelcomeName } from '../../../utils/profileFirstName';
import type { GuideCategory } from '../data/guideTopics.types';
import { getAllGuideTopics, getCategoryLabels, getGuideTopicById } from '../data/guideTopics';
import { selectHomeDiscoveryTopics } from '../data/homeDiscovery';
import { 
  usePastoralPhase, 
  getPastoralMessagePath, 
  isHomeContentQuestion,
  isHomeMinimal,
  useIsReflectivePhase,
  useIsWithdrawalPhase,
  useIsAbidingPhase
} from '../../../core/pastoral/usePastoralPhaseStore';
import './NewMemberHomePage.css';

// Canonical first topic id for new members (title from i18n)
const FIRST_TOPIC_ID = 'sacrament-meeting';
const MEMBER_WEEKLY_LINES = 6;

function DiscoveryCategoryIcon({ category }: { category: GuideCategory }): JSX.Element {
  switch (category) {
    case 'worship':
      return <FaChurch aria-hidden />;
    case 'covenant-living':
      return <FaHeart aria-hidden />;
    case 'ordinances':
      return <FaDroplet aria-hidden />;
    case 'belonging':
      return <FaPeopleGroup aria-hidden />;
  }
}

/**
 * New Member Home Page
 * 
 * Sprint 8 - Spiritual Memory: shows Continue card when available
 * Sprint 12 - Pastoral Phase: adapts tone based on internal phase
 * Sprint 13 - Understanding/Belonging: questions over statements, Journal priority
 * Sprint 14 - Integration/Abiding: intentional withdrawal, minimal presence
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * PASTORAL UX PRINCIPLES
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This page is designed to REDUCE ANXIETY, not create engagement.
 * 
 * ❌ NO urgency language ("Don't miss", "Keep up", "You're behind")
 * ❌ NO streak mechanics or daily goals
 * ❌ NO comparison to others
 * ❌ NO guilt-inducing copy
 * ❌ NO tasks or assignments
 * 
 * ✅ Permission-based language ("When you're ready", "There's no rush")
 * ✅ Calmer visual density (fewer cards, more breathing room)
 * ✅ Reassurance over instruction
 * ✅ Grace over achievement
 * ✅ Questions over statements in deeper phases
 * ✅ Journal as central invitation, not obligation
 * ✅ Intentional withdrawal in final phases (Sprint 14)
 * 
 * Phase behavior:
 *   - stabilizing/rhythm: Declarative messages of reassurance
 *   - understanding/belonging: Open-ended questions that invite reflection
 *   - integration/abiding: Minimal presence, the app steps back
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * SPRINT 14: INTENTIONAL WITHDRAWAL
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * In 'integration' and 'abiding' phases, this page becomes deliberately
 * sparse. This is NOT missing content — it is a design decision.
 * 
 * The app learns to step back without disappearing.
 * The user should feel: "I don't need this app... but it's here."
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */
export default function NewMemberHomePage(): JSX.Element {
  const continueSubtitleId = useId();
  const { t, locale } = useI18n();
  const { profile } = useAuth();
  const { lastLessonId, lastLessonTitle, isHydrated, hydrate } = useSpiritualMemoryStore();
  const phase = usePastoralPhase();
  const isReflective = useIsReflectivePhase();
  const isWithdrawal = useIsWithdrawalPhase();
  const isAbiding = useIsAbidingPhase();
  const isQuestion = isHomeContentQuestion(phase);
  const isMinimal = isHomeMinimal(phase);

  // Hydrate memory on mount
  useEffect(() => {
    if (!isHydrated) {
      hydrate();
    }
  }, [isHydrated, hydrate]);

  // Determine what to show for continue/start
  const hasContinue = isHydrated && lastLessonId && lastLessonTitle;
  const continueId = hasContinue ? lastLessonId : FIRST_TOPIC_ID;
  const continueTitle = hasContinue
    ? lastLessonTitle
    : t('app.newMemberHome.sacramentMeetingTitle');

  const dayIndex = useMemo(() => getLocalDayIndex(), []);
  const categoryLabels = useMemo(() => getCategoryLabels(locale), [locale]);
  const discoveryTopics = useMemo(() => {
    const all = getAllGuideTopics(locale);
    return selectHomeDiscoveryTopics(all, { excludeId: continueId, dayIndex, max: 4 });
  }, [locale, continueId, dayIndex]);

  const continueGuideTopic = useMemo(
    () => getGuideTopicById(continueId, locale),
    [continueId, locale]
  );

  const isNewConvert = profile?.memberStatus === 'new_convert';
  const discoveryTitle = t(
    isNewConvert ? 'app.home.discoveryTitle' : 'app.home.discoveryTitleEstablished'
  );
  const discoveryHint = t(
    isNewConvert ? 'app.home.discoveryHint' : 'app.home.discoveryHintEstablished'
  );

  const discoveryItems = useMemo(
    () =>
      discoveryTopics.map((topic) => ({
        href: `/lessons/${topic.id}`,
        title: topic.title,
        subtitle: topic.subtitle,
        badge: categoryLabels[topic.category],
        icon: <DiscoveryCategoryIcon category={topic.category} />,
      })),
    [discoveryTopics, categoryLabels]
  );

  const weekIndex = useMemo(() => getLocalWeekIndex(), []);
  const memberWeeklyLine = useMemo(() => {
    const i = weekIndex % MEMBER_WEEKLY_LINES;
    return t(`app.home.weeklyLightMember.line${i}`);
  }, [weekIndex, t]);
  const memberWeeklyQuestion = useMemo(() => {
    const i = weekIndex % MEMBER_WEEKLY_LINES;
    return t(`app.home.weeklyQuestionMember.line${i}`);
  }, [weekIndex, t]);

  const welcomeDateLine = useMemo(() => {
    const loc = locale === 'es' ? 'es' : 'en-US';
    const fmt = new Intl.DateTimeFormat(loc, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
    return t('app.home.welcomeDateLine', { date: fmt.format(new Date()) });
  }, [locale, t]);

  // Phase-aware content (i18n)
  const continueLabel = t(getPastoralMessagePath('continueStudy', phase));
  const homeContent = t(getPastoralMessagePath('homeWelcome', phase));
  const journalInvite = t(getPastoralMessagePath('journalInvite', phase));
  const encouragement = t(getPastoralMessagePath('encouragement', phase));

  // In withdrawal phases, show minimal content
  if (isWithdrawal) {
    return (
      <div className={`nm-home nm-home--${phase}`}>
        {/* 
          SPRINT 14: MINIMAL HOME
          
          In integration/abiding phases, the home is deliberately sparse.
          One message (or almost nothing in abiding).
          No CTAs, no prompts, no guidance.
          
          This is intentional design, not missing content.
          The app steps back to let faith be lived.
        */}
        
        {/* Single message card — minimal and quiet */}
        <div className="nm-home__minimal">
          <p className="nm-home__minimal-text">
            {homeContent}
          </p>
        </div>

        {/* 
          Journal — quietly available
          
          In withdrawal phases, Journal is still accessible
          but doesn't push the user to write.
          
          "This space is here when you need it."
          "You don't have to return often."
        */}
        {!isAbiding && (
          <div className="nm-home__journal nm-home__journal--quiet">
            <Link to="/journal" className="nm-home__journal-link">
              <FaPenToSquare className="nm-home__journal-link-icon" />
              <span className="nm-home__journal-link-text">
                {journalInvite}
              </span>
            </Link>
          </div>
        )}

        {/* 
          In abiding phase, even the Journal link becomes
          very subtle — just an icon, almost hidden.
        */}
        {isAbiding && (
          <div className="nm-home__abiding-journal">
            <Link to="/journal" className="nm-home__abiding-journal-link" aria-label={t('app.nav.journal')}>
              <FaPenToSquare />
            </Link>
          </div>
        )}

        {/* 
          No encouragement section in withdrawal phases.
          Silence is the message.
        */}
      </div>
    );
  }

  const hour = new Date().getHours();
  const timeGreeting =
    hour < 12
      ? t('app.home.greetingMorning')
      : hour < 18
        ? t('app.home.greetingAfternoon')
        : t('app.home.greetingEvening');
  const welcomeFirst = firstWelcomeName(profile);
  const welcomeGreetingLine = welcomeFirst
    ? t('app.home.welcomeGreetingNamed', { greeting: timeGreeting, name: welcomeFirst })
    : t('app.home.welcomeGreetingWave', { greeting: timeGreeting });

  const welcomePadClass =
    phase === 'stabilizing'
      ? 'hw-card--pad-stabilizing'
      : phase === 'understanding' || phase === 'belonging'
        ? 'hw-card--pad-reflective'
        : '';

  // Earlier phases: full content
  return (
    <div className={`nm-home nm-home--${phase}`}>
      <HomeWelcomeCard
        className={welcomePadClass}
        ariaLabel={t('app.home.welcomeAriaLabel')}
        greetingLine={welcomeGreetingLine}
        dateLine={welcomeDateLine}
        hour={hour}
        tone={phase === 'understanding' || phase === 'belonging' ? 'soft' : 'default'}
        mode={isQuestion ? 'question' : 'declarative'}
        questionText={isQuestion ? homeContent : undefined}
        title={!isQuestion ? homeContent.split('\n')[0] : undefined}
        subtitle={!isQuestion ? homeContent.split('\n')[1] : undefined}
        titleSize={phase === 'stabilizing' && !isQuestion ? 'large' : 'normal'}
        subtitleSize={phase === 'stabilizing' && !isQuestion ? 'large' : 'normal'}
        showQuickLinks
        exploreLabel={t('app.home.welcomeExploreTopics')}
        journalLabel={t('app.nav.journal')}
        quickNavAriaLabel={t('app.home.welcomeActionsAria')}
      />

      {/* 
        Journal Card — Increased visual priority in reflective phases
        
        In reflective phases (understanding/belonging), Journal moves up
        and becomes more prominent than the continue card.
        
        The copy removes pressure to "write well":
        "You don't need the right words."
        "Write what's true, not what sounds right."
      */}
      {isReflective && (
        <div className="nm-home__journal">
          <Link to="/journal" className="nm-home__journal-card">
            <div className="nm-home__journal-icon">
              <FaPenToSquare />
            </div>
            <div className="nm-home__journal-content">
              <p className="nm-home__journal-text">
                {journalInvite.split('\n')[0]}
              </p>
              {journalInvite.includes('\n') && (
                <p className="nm-home__journal-subtext">
                  {journalInvite.split('\n')[1]}
                </p>
              )}
            </div>
          </Link>
        </div>
      )}

      {/* Continue Card — Destacado, informativo, sin presión */}
      <div className="nm-home__continue">
        <div className="nm-home__continue-label-row">
          <span className="nm-home__continue-label-dot" aria-hidden />
          <p className="nm-home__continue-label">{continueLabel}</p>
        </div>
        <Link
          to={`/lessons/${continueId}`}
          className="nm-home__continue-card"
          aria-describedby={continueSubtitleId}
        >
          <div className="nm-home__continue-card-inner">
            <div className="nm-home__continue-icon" aria-hidden>
              <FaBookOpen />
            </div>
            <div className="nm-home__continue-content">
              {continueGuideTopic ? (
                <span className="nm-home__continue-badge">
                  {categoryLabels[continueGuideTopic.category]}
                </span>
              ) : null}
              <h3 className="nm-home__continue-title">{continueTitle}</h3>
              <p className="nm-home__continue-subtitle" id={continueSubtitleId}>
                {continueGuideTopic?.subtitle ?? t('app.home.continueCardHint')}
              </p>
            </div>
            <span className="nm-home__continue-arrow-wrap" aria-hidden>
              <FaChevronRight className="nm-home__continue-arrow" />
            </span>
          </div>
        </Link>
      </div>

      <HomeDiscoveryRails
        title={discoveryTitle}
        hint={discoveryHint}
        seeAllHref="/lessons"
        seeAllLabel={t('app.home.discoveryOpenGuide')}
        items={discoveryItems}
        sectionAriaLabel={discoveryTitle}
      />

      <section
        className="nm-home__weekly-light"
        aria-label={t('app.home.weeklyLightMember.title')}
      >
        <p className="nm-home__weekly-light-eyebrow">
          {t('app.home.weeklyLightMember.title')}
        </p>
        <p className="nm-home__weekly-light-text">{memberWeeklyLine}</p>
        <p className="nm-home__weekly-question-label">
          {t('app.home.weeklyQuestionMember.label')}
        </p>
        <p className="nm-home__weekly-question-text">{memberWeeklyQuestion}</p>
      </section>

      {/* Training Card — Capacitación (covenanted only) */}
      <div className="nm-home__training">
        <Link to="/training" className="nm-home__training-card">
          <div className="nm-home__training-icon">
            <FaGraduationCap />
          </div>
          <div className="nm-home__training-content">
            <h3 className="nm-home__training-title">{t('app.home.trainingTitle')}</h3>
            <p className="nm-home__training-subtitle">
              {t('app.home.trainingSubtitle')}
            </p>
          </div>
          <span className="nm-home__training-arrow-wrap" aria-hidden>
            <FaChevronRight className="nm-home__training-arrow" />
          </span>
        </Link>
      </div>

      {/* 
        Encouragement — Closing message
        
        Earlier phases: More words, explicit reassurance
        Later phases: Fewer words, more silence
        
        In belonging phase, this becomes an affirmation of presence:
        "You belong here, even on quiet weeks."
      */}
      {encouragement && (
        <div className="nm-home__encouragement">
          <p className="nm-home__encouragement-text">
            {encouragement}
          </p>
        </div>
      )}
    </div>
  );
}
