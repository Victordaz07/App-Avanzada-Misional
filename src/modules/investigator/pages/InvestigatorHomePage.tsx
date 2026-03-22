import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa6';
import { useAuth } from '../../../context/AuthContext';
import {
  getInvestigatorCoreLessons,
  getLessonById,
  isInvestigatorCoreTopicId,
} from '../data/lessons';
import { selectInvestigatorDiscoveryLessons } from '../data/homeDiscoveryInvestigator';
import { getHomeScripture } from '../data/scriptures';
import { useInvestigatorStore } from '../store/useInvestigatorStore';
import { ScriptureCard } from '../components/ScriptureCard';
import { useI18n } from '../../../context/I18nContext';
import HomeDiscoveryRails from '../../../ui/home-discovery/HomeDiscoveryRails';
import { HomeWelcomeCard } from '../../../ui/home-welcome/HomeWelcomeCard';
import { firstWelcomeName } from '../../../utils/profileFirstName';
import { getLocalDayIndex } from '../../../utils/localDayIndex';
import { getLocalWeekIndex } from '../../../utils/localWeekIndex';
import './InvestigatorHomePage.css';

const INVESTIGATOR_WEEKLY_LINES = 6;

/**
 * Investigator Home Page
 * Sprint 7 - Pastoral tone, no metrics
 * Now with i18n support and dynamic greeting
 */
export default function InvestigatorHomePage(): JSX.Element {
  const { t, locale } = useI18n();
  const { profile } = useAuth();
  const { lastLessonId } = useInvestigatorStore();
  const contentLocale: 'es' | 'en' = locale === 'es' ? 'es' : 'en';
  const homeScripture = getHomeScripture(contentLocale);
  const coreLessons = getInvestigatorCoreLessons(contentLocale);

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

  const welcomeDateLine = useMemo(() => {
    const loc = locale === 'es' ? 'es' : 'en-US';
    const fmt = new Intl.DateTimeFormat(loc, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
    return t('app.home.welcomeDateLine', { date: fmt.format(new Date()) });
  }, [locale, t]);

  // Get current lesson to continue or first lesson
  const currentLesson =
    lastLessonId && isInvestigatorCoreTopicId(lastLessonId)
      ? getLessonById(lastLessonId, contentLocale)
      : coreLessons[0];

  const dayIndex = useMemo(() => getLocalDayIndex(), []);
  const continueId = currentLesson?.id ?? '';
  const discoveryLessons = useMemo(
    () =>
      selectInvestigatorDiscoveryLessons(coreLessons, {
        excludeId: continueId,
        dayIndex,
        max: 4,
      }),
    [coreLessons, continueId, dayIndex]
  );

  const weekIndex = useMemo(() => getLocalWeekIndex(), []);
  const investigatorWeeklyLine = useMemo(() => {
    const i = weekIndex % INVESTIGATOR_WEEKLY_LINES;
    return t(`app.home.weeklyLightInvestigator.line${i}`);
  }, [weekIndex, t]);
  const investigatorWeeklyQuestion = useMemo(() => {
    const i = weekIndex % INVESTIGATOR_WEEKLY_LINES;
    return t(`app.home.weeklyQuestionInvestigator.line${i}`);
  }, [weekIndex, t]);
  const discoveryItems = useMemo(
    () =>
      discoveryLessons.map((lesson) => ({
        href: `/lessons/${lesson.id}`,
        title: lesson.title,
        subtitle: lesson.subtitle,
        badge: t('app.home.discoveryBadgeMissionaryPath'),
        icon: <span aria-hidden>{lesson.icon}</span>,
      })),
    [discoveryLessons, t]
  );

  return (
    <div className="inv-home anim-fade-up">
      <HomeWelcomeCard
        ariaLabel={t('app.home.welcomeAriaLabel')}
        greetingLine={welcomeGreetingLine}
        dateLine={welcomeDateLine}
        hour={hour}
        title={t('app.home.title')}
        subtitle={t('app.home.subtitle')}
        showQuickLinks
        exploreLabel={t('app.home.welcomeExploreTopics')}
        journalLabel={t('app.nav.journal')}
        quickNavAriaLabel={t('app.home.welcomeActionsAria')}
      />

      {/* Continue Learning - Hero Card */}
      {currentLesson && (
        <div className="inv-home__continue">
          <div className="inv-home__continue-header">
            <span className="inv-home__continue-label">
              {lastLessonId ? t('app.home.continueLabel') : t('app.home.startLabel')}
            </span>
            <Link to="/lessons" className="inv-home__continue-link">
              {t('app.common.seeAll')}
            </Link>
          </div>
          <Link
            to={`/lessons/${currentLesson.id}`}
            className="inv-home__continue-card"
          >
            <div className="inv-home__continue-icon">{currentLesson.icon}</div>
            <div className="inv-home__continue-info">
              <h3 className="inv-home__continue-title">
                {currentLesson.title}
              </h3>
              <p className="inv-home__continue-meta">
                {currentLesson.subtitle}
              </p>
            </div>
            <FaChevronRight className="inv-home__continue-arrow" />
          </Link>
        </div>
      )}

      {discoveryItems.length > 0 ? (
        <HomeDiscoveryRails
          className="inv-home__discovery"
          title={t('app.home.discoveryTitleInvestigator')}
          hint={t('app.home.discoveryHintInvestigator')}
          seeAllHref="/lessons"
          seeAllLabel={t('app.home.discoveryOpenMissionaryPath')}
          items={discoveryItems}
          sectionAriaLabel={t('app.home.discoveryTitleInvestigator')}
        />
      ) : null}

      {/* Daily Scripture */}
      <div className="inv-home__scripture-section">
        <h2 className="inv-home__section-title">{t('app.home.scriptureTitle')}</h2>
        <ScriptureCard scripture={homeScripture} />
      </div>

      <section
        className="inv-home__weekly-light"
        aria-label={t('app.home.weeklyLightInvestigator.title')}
      >
        <p className="inv-home__weekly-light-eyebrow">
          {t('app.home.weeklyLightInvestigator.title')}
        </p>
        <p className="inv-home__weekly-light-text">{investigatorWeeklyLine}</p>
        <p className="inv-home__weekly-question-label">
          {t('app.home.weeklyQuestionInvestigator.label')}
        </p>
        <p className="inv-home__weekly-question-text">{investigatorWeeklyQuestion}</p>
      </section>
    </div>
  );
}
