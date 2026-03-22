import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaChevronRight,
  FaChurch,
  FaHeart,
  FaDroplet,
  FaPeopleGroup,
} from 'react-icons/fa6';
import {
  getAllGuideTopics,
  getCategoryLabels,
  type GuideTopic,
  type GuideCategory,
} from '../data/guideTopics';
import { getNewMemberLibraryLessons } from '../../investigator/data/lessons';
import { useI18n } from '../../../context/I18nContext';
import './NewMemberGuidePage.css';

function GuideCategoryIcon({ category }: { category: GuideCategory }): JSX.Element {
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
 * New Member Guide Page
 * Sprint 5 - Real content, no gamification
 *
 * Displays guide topics grouped by category.
 * Each topic links to /lessons/<topicId> for detail view.
 */
export default function NewMemberGuidePage(): JSX.Element {
  const { t, locale } = useI18n();
  const topics = getAllGuideTopics(locale);
  const libraryLessons = getNewMemberLibraryLessons(locale);
  const categoryLabels = getCategoryLabels(locale);

  // Group topics by category
  const topicsByCategory = topics.reduce<Record<string, GuideTopic[]>>(
    (acc, topic) => {
      if (!acc[topic.category]) {
        acc[topic.category] = [];
      }
      acc[topic.category].push(topic);
      return acc;
    },
    {},
  );

  // Order of categories
  const categoryOrder: GuideTopic['category'][] = [
    'worship',
    'covenant-living',
    'ordinances',
    'belonging',
  ];

  let toneCounter = 0;

  return (
    <div className="nm-guide">
      {/* Header (fuera del panel menta, como en home + sección transición) */}
      <header className="nm-guide__header">
        <h1 className="nm-guide__title">{t('app.newMemberGuide.title')}</h1>
        <p className="nm-guide__subtitle">{t('app.newMemberGuide.subtitle')}</p>
      </header>

      <div className="nm-guide__shell">
        {/* Topics by Category */}
        {categoryOrder.map(category => {
          const categoryTopics = topicsByCategory[category];
          if (!categoryTopics || categoryTopics.length === 0) return null;

          return (
            <section key={category} className="nm-guide__category">
              <h2 className="nm-guide__category-title">
                {categoryLabels[category]}
              </h2>
              <div className="nm-guide__topics" role="list">
                {categoryTopics.map(topic => {
                  const tone = toneCounter % 4;
                  toneCounter += 1;
                  return (
                    <Link
                      key={topic.id}
                      to={`/lessons/${topic.id}`}
                      className={`nm-guide__topic nm-guide__topic--tone-${tone}`}
                      role="listitem"
                    >
                      <div className="nm-guide__topic-icon" aria-hidden>
                        <GuideCategoryIcon category={topic.category} />
                      </div>
                      <div className="nm-guide__topic-body">
                        <span className="nm-guide__topic-badge">
                          {categoryLabels[topic.category]}
                        </span>
                        <h3 className="nm-guide__topic-title">{topic.title}</h3>
                        <p className="nm-guide__topic-desc">{topic.subtitle}</p>
                      </div>
                      <span className="nm-guide__topic-arrow-wrap" aria-hidden>
                        <FaChevronRight className="nm-guide__topic-arrow" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* Library (lessons.ts) */}
        {libraryLessons.length > 0 && (
          <details className="nm-guide__library">
            <summary className="nm-guide__library-summary">
              {t('app.newMemberGuide.librarySummary')}
            </summary>
            <p className="nm-guide__library-note">{t('app.newMemberGuide.libraryNote')}</p>
            <div className="nm-guide__topics" role="list">
              {libraryLessons.map(lesson => {
                const tone = toneCounter % 4;
                toneCounter += 1;
                return (
                  <Link
                    key={lesson.id}
                    to={`/lessons/${lesson.id}`}
                    className={`nm-guide__topic nm-guide__topic--tone-${tone} nm-guide__topic--library`}
                    role="listitem"
                  >
                    <div className="nm-guide__topic-icon nm-guide__topic-icon--emoji" aria-hidden>
                      <span className="nm-guide__topic-emoji">{lesson.icon}</span>
                    </div>
                    <div className="nm-guide__topic-body">
                      <span className="nm-guide__topic-badge nm-guide__topic-badge--library">
                        {t('app.newMemberGuide.libraryBadge')}
                      </span>
                      <h3 className="nm-guide__topic-title">{lesson.title}</h3>
                      <p className="nm-guide__topic-desc">{lesson.subtitle}</p>
                    </div>
                    <span className="nm-guide__topic-arrow-wrap" aria-hidden>
                      <FaChevronRight className="nm-guide__topic-arrow" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </details>
        )}
      </div>

      {/* Closing encouragement */}
      <footer className="nm-guide__footer">
        <p className="nm-guide__footer-text">{t('app.newMemberGuide.footer')}</p>
      </footer>
    </div>
  );
}
