import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getCategoryLabels, getGuideTopicById } from '../data/guideTopics';
import { getGuideTopicDiscussion } from '../data/guideTopicDiscussion';
import { getGuideTopicScriptureConfig } from '../data/guideTopicScriptures';
import { getLessonById } from '../../investigator/data/lessons';
import { getScriptureByReference } from '../../investigator/data/scriptures';
import { useInvestigatorStore } from '../../investigator/store/useInvestigatorStore';
import { useSpiritualMemoryStore } from '../../../core/memory/useSpiritualMemoryStore';
import { useI18n } from '../../../context/I18nContext';
import {
  TeachingCanonShell,
  TeachingCanonBackLink,
  TeachingCanonHeroHeader,
  TeachingCanonAudioCard,
  TeachingCanonFeaturedScripture,
  TeachingCanonImagePlaceholder,
  TeachingCanonAccordionSection,
  TeachingCanonSectionScripture,
  TeachingCanonExtra,
  TeachingCanonReflection,
  TeachingCanonFooter,
  TeachingCanonNotFound,
  TeachingCanonLessonFlatSection,
} from '../../../ui/teaching-canon';

/**
 * New Member Guide Detail Page
 * Sprint 5 - Shows topic content with reflection saving
 *
 * Reuses the investigator journal store for continuity.
 */
export default function NewMemberGuideDetailPage(): JSX.Element {
  const { t, locale } = useI18n();
  const params = useParams();
  const location = useLocation();
  const topicId: string =
    (params.topicId as string | undefined) ??
    (params['*'] as string | undefined) ??
    (location.pathname.startsWith('/lessons/')
      ? location.pathname.replace(/^\/lessons\/?/, '').split('/')[0] || ''
      : '');
  const { addJournalEntry } = useInvestigatorStore();
  const { setLastLesson, markSavedToJournal } = useSpiritualMemoryStore();

  const [openSectionId, setOpenSectionId] = useState<string | null>(null);
  const [openExtraId, setOpenExtraId] = useState<'questions' | 'application' | null>(null);
  const [reflection, setReflection] = useState('');
  const [saved, setSaved] = useState(false);

  const topic = getGuideTopicById(topicId, locale);
  const lesson = topic ? null : getLessonById(topicId, locale);
  const detailContent = topic ?? lesson;
  const categoryLabels = getCategoryLabels(locale);
  const scriptureConfig = topic ? getGuideTopicScriptureConfig(topic.id, locale) : undefined;
  const topicDiscussion = topic ? getGuideTopicDiscussion(topic.id, locale) : undefined;
  const featuredScripture = scriptureConfig?.featuredReference
    ? getScriptureByReference(scriptureConfig.featuredReference, locale) ?? null
    : null;
  const normalizedAudioStatus = topic?.audioPlaceholder?.status?.toLowerCase();
  const audioStatusLabel =
    normalizedAudioStatus === 'draft' ||
    normalizedAudioStatus === 'pendiente' ||
    normalizedAudioStatus === 'pending'
      ? locale === 'es'
        ? 'Audio disponible proximamente'
        : 'Audio coming soon'
      : topic?.audioPlaceholder?.status;

  // Remember last visited topic
  useEffect(() => {
    if (topic) {
      setLastLesson({ id: topicId, title: topic.title });
    } else if (lesson) {
      setLastLesson({ id: topicId, title: lesson.title });
    }
  }, [topic, lesson, topicId, setLastLesson]);

  useEffect(() => {
    if (topic?.sections.length) {
      setOpenSectionId(`${topic.id}-section-0`);
      return;
    }

    if (lesson?.sections.length) {
      setOpenSectionId(lesson.sections[0]?.id ?? null);
      return;
    }

    setOpenSectionId(null);
  }, [topic, lesson]);

  const handleSaveReflection = (): void => {
    if (reflection.trim()) {
      addJournalEntry({
        type: 'text',
        content: reflection,
        lessonId: topicId, // Reuse lessonId field for topic reference
      });
      markSavedToJournal();
      setReflection('');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  if (!detailContent) {
    return (
      <TeachingCanonShell>
        <TeachingCanonBackLink to="/lessons">{t('app.lessons.backToExplore')}</TeachingCanonBackLink>
        <TeachingCanonNotFound
          title={t('app.lessons.notAvailableTitle')}
          message={t('app.lessons.notAvailableText')}
        />
      </TeachingCanonShell>
    );
  }

  return (
    <TeachingCanonShell>
      <TeachingCanonBackLink to="/lessons">{t('app.lessons.backToExplore')}</TeachingCanonBackLink>

      <TeachingCanonHeroHeader
        categoryLabel={topic ? categoryLabels[topic.category] : null}
        title={detailContent.title}
        subtitle={detailContent.subtitle}
        heroNote={t('app.lessons.guideLayeredNote')}
      />

      {topic?.audioPlaceholder ? (
        <TeachingCanonAudioCard
          audio={topic.audioPlaceholder}
          audioStatusLabel={audioStatusLabel}
        />
      ) : null}

      {featuredScripture ? (
        <TeachingCanonFeaturedScripture
          label={t('app.lessons.featuredScripture')}
          scripture={featuredScripture}
        />
      ) : null}

      <div className="nm-guide-detail__sections">
        {topic
          ? topic.sections.map((section, index) => {
              const sid = `${topic.id}-section-${index}`;
              const isOpen = openSectionId === sid;
              const refs = scriptureConfig?.sectionReferences?.[index] ?? [];
              return (
                <TeachingCanonAccordionSection
                  key={sid}
                  sectionId={sid}
                  isOpen={isOpen}
                  onToggle={() =>
                    setOpenSectionId((prev) => (prev === sid ? null : sid))
                  }
                  kicker={`${t('app.lessons.guideSectionLabel')} ${index + 1}`}
                  title={section.title}
                >
                  {section.imagePlaceholder?.placement !== 'after' && section.imagePlaceholder ? (
                    <TeachingCanonImagePlaceholder image={section.imagePlaceholder} />
                  ) : null}
                  <div className="nm-guide-detail__section-content">
                    {section.content.split(/\n\n+/).map((para, i) => (
                      <p key={i}>{para.trim()}</p>
                    ))}
                  </div>
                  <TeachingCanonSectionScripture
                    sectionScripturesLabel={t('app.lessons.sectionScriptures')}
                    openScriptureNote={t('app.lessons.openScriptureNote')}
                    references={refs}
                  />
                  {section.imagePlaceholder?.placement === 'after' && section.imagePlaceholder ? (
                    <TeachingCanonImagePlaceholder image={section.imagePlaceholder} />
                  ) : null}
                </TeachingCanonAccordionSection>
              );
            })
          : lesson!.sections.map((section) => (
              <TeachingCanonLessonFlatSection
                key={section.id}
                title={section.title}
                paragraphs={section.content.split(/\n\n+/).map((p) => p.trim())}
              />
            ))}
      </div>

      {topicDiscussion?.doctrinalQuestions?.length ? (
        <TeachingCanonExtra
          title={t('app.lessons.doctrinalQuestions')}
          isOpen={openExtraId === 'questions'}
          onToggle={() =>
            setOpenExtraId((prev) => (prev === 'questions' ? null : 'questions'))
          }
          note={t('app.lessons.doctrinalQuestionsNote')}
          items={topicDiscussion.doctrinalQuestions}
        />
      ) : null}

      {topicDiscussion?.lifeApplicationIdeas?.length ? (
        <TeachingCanonExtra
          title={t('app.lessons.realLifeApplication')}
          isOpen={openExtraId === 'application'}
          onToggle={() =>
            setOpenExtraId((prev) => (prev === 'application' ? null : 'application'))
          }
          note={t('app.lessons.realLifeApplicationNote')}
          items={topicDiscussion.lifeApplicationIdeas}
        />
      ) : null}

      <TeachingCanonReflection
        reflectionLabel={t('app.lessons.personalReflection')}
        reflectionPrompt={topic ? topic.reflectionPrompt : lesson!.reflectionPrompt}
        placeholder={t('app.lessons.reflectionPlaceholder')}
        value={reflection}
        onChange={setReflection}
        onSave={handleSaveReflection}
        saveLabel={t('app.lessons.saveToJournal')}
        savedLabel={t('app.lessons.savedToJournal')}
        savedMessage={t('app.lessons.savedMessage')}
        saved={saved}
      />

      <TeachingCanonFooter>{t('app.lessons.footerText')}</TeachingCanonFooter>
    </TeachingCanonShell>
  );
}
