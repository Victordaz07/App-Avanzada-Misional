import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaHeart, FaChurch, FaDroplet, FaPeopleGroup } from 'react-icons/fa6';
import { useAuth } from '../../context/AuthContext';
import { useI18n } from '../../context/I18nContext';
import HomeDiscoveryRails from '../../ui/home-discovery/HomeDiscoveryRails';
import { HomeWelcomeCard } from '../../ui/home-welcome/HomeWelcomeCard';
import { firstWelcomeName } from '../../utils/profileFirstName';
import { getLocalDayIndex } from '../../utils/localDayIndex';
import { getLocalWeekIndex } from '../../utils/localWeekIndex';
import type { GuideCategory } from '../../modules/new-member/data/guideTopics.types';
import { getAllGuideTopics, getCategoryLabels } from '../../modules/new-member/data/guideTopics';
import { selectHomeDiscoveryTopics } from '../../modules/new-member/data/homeDiscovery';
import {
  PageContainer,
  TopBar,
  Card,
  Section,
  IconButton,
} from '../../ui/components';
import '../learning/Page.css';
import '../learning/HomePage.css';
import './MemberHomeScreen.css';

const LEGACY_GUIDE_EXCLUDE_ID = 'sacrament-meeting';
const MEMBER_WEEKLY_LINES = 6;

function LegacyGuideCategoryIcon({ category }: { category: GuideCategory }): JSX.Element {
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

const MemberHomeScreen: React.FC = () => {
  const { t, locale } = useI18n();
  const { profile } = useAuth();
  const navigate = useNavigate();

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

  // Mock service progress data (TODO: connect to real data)
  const [serviceProgress] = useState({
    accompaniedInvestigator: false,
    boreTestimony: false,
    helpedMissionaries: false,
    extendedInvitation: false,
  });

  const dayIndex = useMemo(() => getLocalDayIndex(), []);
  const categoryLabels = useMemo(() => getCategoryLabels(locale), [locale]);
  const legacyDiscoveryTopics = useMemo(() => {
    const all = getAllGuideTopics(locale);
    return selectHomeDiscoveryTopics(all, {
      excludeId: LEGACY_GUIDE_EXCLUDE_ID,
      dayIndex,
      max: 4,
    });
  }, [locale, dayIndex]);
  const legacyDiscoveryItems = useMemo(
    () =>
      legacyDiscoveryTopics.map((topic) => ({
        href: `/lessons/${topic.id}`,
        title: topic.title,
        subtitle: topic.subtitle,
        badge: categoryLabels[topic.category],
        icon: <LegacyGuideCategoryIcon category={topic.category} />,
      })),
    [legacyDiscoveryTopics, categoryLabels]
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

  const quickActions = [
    {
      icon: '🤝',
      title: t('memberHome.quickActions.helpMissionaries'),
      link: '/member/help-panel',
      color: 'primary'
    },
    {
      icon: '👥',
      title: t('memberHome.quickActions.friends'),
      link: '/member/friends',
      color: 'secondary'
    },
    {
      icon: '🎓',
      title: t('memberHome.quickActions.training'),
      link: '/member/training',
      color: 'accent'
    },
    {
      icon: '🌱',
      title: t('memberHome.quickActions.newConverts'),
      link: '/member/new-converts',
      color: 'success'
    }
  ];

  return (
    <PageContainer>
      <TopBar
        title={t('memberHome.header.title')}
        subtitle={t('memberHome.header.subtitle')}
        rightAction={<IconButton icon={<FaBell />} ariaLabel={t('common.notifications')} />}
      />

      <div className="page-content">
        <div className="member-home-welcome">
          <HomeWelcomeCard
            ariaLabel={t('app.home.welcomeAriaLabel')}
            greetingLine={welcomeGreetingLine}
            dateLine={welcomeDateLine}
            hour={hour}
            title={t('app.home.title')}
            subtitle={t('app.home.subtitle')}
            showQuickLinks
            journalHref="/member/diary"
            exploreHref="/lessons"
            exploreLabel={t('app.home.welcomeExploreTopics')}
            journalLabel={t('app.nav.journal')}
            quickNavAriaLabel={t('app.home.welcomeActionsAria')}
          />
        </div>

        {legacyDiscoveryItems.length > 0 ? (
          <HomeDiscoveryRails
            title={t('memberHome.discovery.title')}
            hint={t('memberHome.discovery.hint')}
            seeAllHref="/lessons"
            seeAllLabel={t('memberHome.discovery.seeAll')}
            items={legacyDiscoveryItems}
            sectionAriaLabel={t('memberHome.discovery.title')}
          />
        ) : null}

        <section
          className="member-home-weekly-light"
          aria-label={t('app.home.weeklyLightMember.title')}
        >
          <p className="member-home-weekly-light__eyebrow">
            {t('app.home.weeklyLightMember.title')}
          </p>
          <p className="member-home-weekly-light__text">{memberWeeklyLine}</p>
          <p className="member-home-weekly-light__q-label">
            {t('app.home.weeklyQuestionMember.label')}
          </p>
          <p className="member-home-weekly-light__q-text">{memberWeeklyQuestion}</p>
        </section>

        {/* Quick Actions */}
        <Section title={t('memberHome.quickActions.title')}>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                variant="default"
                className={`action-card action-${action.color}`}
                onClick={() => navigate(action.link)}
              >
                <div className="action-icon">{action.icon}</div>
                <div className="action-content">
                  <h4 className="action-title">{action.title}</h4>
                </div>
                <div className="action-arrow">→</div>
              </Card>
            ))}
          </div>
        </Section>

        {/* Service Progress */}
        <Card variant="outlined" className="member-service-progress">
          <h3 className="service-progress-title">
            {t('memberHome.serviceProgress.title')}
          </h3>
          <div className="service-progress-checklist">
            <label className="service-progress-item">
              <input
                type="checkbox"
                checked={serviceProgress.accompaniedInvestigator}
                readOnly
              />
              <span>{t('memberHome.serviceProgress.accompaniedInvestigator')}</span>
            </label>
            <label className="service-progress-item">
              <input
                type="checkbox"
                checked={serviceProgress.boreTestimony}
                readOnly
              />
              <span>{t('memberHome.serviceProgress.boreTestimony')}</span>
            </label>
            <label className="service-progress-item">
              <input
                type="checkbox"
                checked={serviceProgress.helpedMissionaries}
                readOnly
              />
              <span>{t('memberHome.serviceProgress.helpedMissionaries')}</span>
            </label>
            <label className="service-progress-item">
              <input
                type="checkbox"
                checked={serviceProgress.extendedInvitation}
                readOnly
              />
              <span>{t('memberHome.serviceProgress.extendedInvitation')}</span>
            </label>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};

export default MemberHomeScreen;

