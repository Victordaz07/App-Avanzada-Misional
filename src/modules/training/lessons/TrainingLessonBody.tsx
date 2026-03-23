/**
 * Cuerpo de lección Training con layout Teaching Canon (hero, audio, imagen, bloques, extras).
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { CanonicalScriptureExcerpt, ScriptureReferenceCard } from '../../../ui/components';
import {
  TeachingCanonHeroHeader,
  TeachingCanonAudioCard,
  TeachingCanonImagePlaceholder,
  TeachingCanonAccordionSection,
  TeachingCanonExtra,
} from '../../../ui/teaching-canon';
import type { GuideAudioPlaceholder, GuideImagePlaceholder } from '../../new-member/data/guideTopics.types';
import { FaCheck, FaCircle } from 'react-icons/fa6';
import { useI18n } from '../../../context/I18nContext';
import {
  lessonsById,
  getTrainingLessonCategoryLabel,
  trainingLessonTitle,
} from '../data/trainingPaths';
import type { TrainingLessonCanonicalContent } from './content/trainingLessonContent.types';
import {
  getLessonStorage,
  setLessonStorage,
  setLessonStorageDebounced,
  flushLessonStorageDebounced,
} from './lessonStorage';
import './TrainingLessonCanon.css';

export interface TrainingLessonBodyProps {
  lessonId: string;
  content: TrainingLessonCanonicalContent;
  onPracticeProgress?: (checked: number, total: number) => void;
}

function loadMap(lessonId: string, key: 'practice' | 'reflections'): Record<number, unknown> {
  const suffix = key === 'practice' ? 'practice' : 'reflections';
  const storageKey = `training:lesson:${lessonId}:${suffix}`;
  if (key === 'practice') {
    const parsed = getLessonStorage<Record<string, boolean>>(storageKey, {});
    return Object.fromEntries(Object.entries(parsed).map(([k, v]) => [Number(k), v]));
  }
  const parsed = getLessonStorage<Record<string, string>>(storageKey, {});
  return Object.fromEntries(Object.entries(parsed).map(([k, v]) => [Number(k), v]));
}

function parseApplicationItems(actionText: string): string[] {
  const lines = actionText
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return lines.length > 0 ? lines : [actionText.trim()].filter(Boolean);
}

export function TrainingLessonBody({
  lessonId,
  content: c,
  onPracticeProgress,
}: TrainingLessonBodyProps): JSX.Element {
  const { t, locale } = useI18n();
  const storagePracticeKey = `training:lesson:${lessonId}:practice`;
  const storageReflectionsKey = `training:lesson:${lessonId}:reflections`;

  const lesson = lessonsById[lessonId];
  const categoryLabel = getTrainingLessonCategoryLabel(lessonId, locale);
  const sectionPrefix = useMemo(
    () => `training-${lessonId.replace(/[^a-zA-Z0-9]+/g, '-')}`,
    [lessonId],
  );

  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>(() =>
    loadMap(lessonId, 'practice') as Record<number, boolean>,
  );
  const [reflections, setReflections] = useState<Record<number, string>>(() =>
    loadMap(lessonId, 'reflections') as Record<number, string>,
  );

  const [openSectionId, setOpenSectionId] = useState<string | null>(null);
  const [openExtraId, setOpenExtraId] = useState<'questions' | 'application' | null>(null);

  useEffect(() => {
    setOpenSectionId(`${sectionPrefix}-section-0`);
  }, [sectionPrefix]);

  const totalPractice = c.practiceItems.length;
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  const reflectionIdPrefix = useMemo(
    () => lessonId.replace(/[^a-zA-Z0-9]+/g, '-'),
    [lessonId],
  );

  useEffect(() => {
    setLessonStorage(storagePracticeKey, checkedItems);
    onPracticeProgress?.(checkedCount, totalPractice);
  }, [checkedItems, checkedCount, totalPractice, onPracticeProgress, storagePracticeKey]);

  useEffect(() => {
    setLessonStorageDebounced(storageReflectionsKey, reflections, 400);
    return () => flushLessonStorageDebounced(storageReflectionsKey);
  }, [reflections, storageReflectionsKey]);

  const toggleCheck = useCallback((idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  }, []);

  const setReflection = useCallback((idx: number, value: string) => {
    setReflections((prev) => ({ ...prev, [idx]: value }));
  }, []);

  const displayTitle = lesson ? trainingLessonTitle(lesson, locale) : '';

  const audioPlaceholder: GuideAudioPlaceholder = useMemo(() => {
    const title = displayTitle;
    const minutes = lesson?.estimatedMinutes;
    return {
      eyebrow: t('app.training.lesson.audioEyebrow'),
      title,
      summary: t('app.training.lesson.audioSummaryPlaceholder'),
      scriptIntent: t('app.training.lesson.audioIntentPlaceholder'),
      status: 'pending',
      durationLabel:
        minutes !== undefined && minutes > 0
          ? t('app.training.lesson.durationApprox', { minutes })
          : undefined,
    };
  }, [displayTitle, lesson, t]);

  const imagePlaceholder: GuideImagePlaceholder = useMemo(
    () => ({
      label: t('app.training.lesson.imageLabel'),
      title: t('app.training.lesson.imageTitlePlaceholder'),
      prompt: t('app.training.lesson.imagePromptPlaceholder'),
      aspectRatio: '16:9',
    }),
    [t],
  );

  const applicationItems = useMemo(() => parseApplicationItems(c.actionText), [c.actionText]);

  const blockKicker = (n: number): string => `${t('app.lessons.guideSectionLabel')} ${n}`;

  if (!lesson) {
    return <></>;
  }

  return (
    <>
      <TeachingCanonHeroHeader
        categoryLabel={categoryLabel}
        title={displayTitle}
        subtitle={c.intro}
        heroNote={t('app.training.lesson.heroNote')}
      />

      {c.officialLinks && c.officialLinks.length > 0 ? (
        <div className="tr-canon__official-links">
          <p className="tr-canon__hint">{t('app.training.lesson.officialResourcesHeading')}</p>
          <ul className="tr-canon__official-links-list">
            {c.officialLinks.map((link) => (
              <li key={`${link.url}-${link.label}`}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <TeachingCanonAudioCard
        audio={audioPlaceholder}
        audioStatusLabel={t('app.training.lesson.audioStatusPending')}
      />

      <TeachingCanonImagePlaceholder image={imagePlaceholder} />

      <div className="tr-canon__sections nm-guide-detail__sections">
        <TeachingCanonAccordionSection
          sectionId={`${sectionPrefix}-section-0`}
          isOpen={openSectionId === `${sectionPrefix}-section-0`}
          onToggle={() =>
            setOpenSectionId((prev) =>
              prev === `${sectionPrefix}-section-0` ? null : `${sectionPrefix}-section-0`,
            )
          }
          kicker={blockKicker(1)}
          title={c.objectivesHeading}
        >
          <ul className="tr-canon__list">
            {c.objectives.map((obj, i) => (
              <li key={i}>{obj}</li>
            ))}
          </ul>
        </TeachingCanonAccordionSection>

        <TeachingCanonAccordionSection
          sectionId={`${sectionPrefix}-section-1`}
          isOpen={openSectionId === `${sectionPrefix}-section-1`}
          onToggle={() =>
            setOpenSectionId((prev) =>
              prev === `${sectionPrefix}-section-1` ? null : `${sectionPrefix}-section-1`,
            )
          }
          kicker={blockKicker(2)}
          title={c.briefHeading}
        >
          <div className="tr-canon__section-content nm-guide-detail__section-content">
            <p>{c.briefBody}</p>
          </div>
        </TeachingCanonAccordionSection>

        <TeachingCanonAccordionSection
          sectionId={`${sectionPrefix}-section-2`}
          isOpen={openSectionId === `${sectionPrefix}-section-2`}
          onToggle={() =>
            setOpenSectionId((prev) =>
              prev === `${sectionPrefix}-section-2` ? null : `${sectionPrefix}-section-2`,
            )
          }
          kicker={blockKicker(3)}
          title={c.scripturesHeading}
        >
          <p className="nm-guide-detail__section-scripture-note">{t('app.lessons.openScriptureNote')}</p>
          {c.scriptures.map((s) => (
            <div key={s.ref} className="tr-canon__scripture-block">
              <CanonicalScriptureExcerpt reference={s.ref} className="tr-canon__scripture-excerpt" />
              <ScriptureReferenceCard reference={s.ref} className="nm-guide-detail__scripture-ref" />
            </div>
          ))}
        </TeachingCanonAccordionSection>

        <TeachingCanonAccordionSection
          sectionId={`${sectionPrefix}-section-3`}
          isOpen={openSectionId === `${sectionPrefix}-section-3`}
          onToggle={() =>
            setOpenSectionId((prev) =>
              prev === `${sectionPrefix}-section-3` ? null : `${sectionPrefix}-section-3`,
            )
          }
          kicker={blockKicker(4)}
          title={c.didYouKnowHeading}
        >
          <div className="tr-canon__callout">
            <ul className="tr-canon__callout-list">
              {c.didYouKnow.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        </TeachingCanonAccordionSection>

        <TeachingCanonAccordionSection
          sectionId={`${sectionPrefix}-section-4`}
          isOpen={openSectionId === `${sectionPrefix}-section-4`}
          onToggle={() =>
            setOpenSectionId((prev) =>
              prev === `${sectionPrefix}-section-4` ? null : `${sectionPrefix}-section-4`,
            )
          }
          kicker={blockKicker(5)}
          title={c.practiceHeading}
        >
          <p className="tr-canon__hint">{c.practiceHint}</p>
          <ul className="tr-canon__checklist" role="group" aria-label={c.practiceHeading}>
            {c.practiceItems.map((item, i) => (
              <li key={i} className="tr-canon__checklist-item-wrapper">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={checkedItems[i] ?? false}
                  aria-label={`${item}. ${checkedItems[i] ? c.practiceDone : c.practicePending}`}
                  className={`tr-canon__checklist-item ${checkedItems[i] ? 'tr-canon__checklist-item--done' : ''}`}
                  onClick={() => toggleCheck(i)}
                >
                  <span className="tr-canon__checklist-icon" aria-hidden>
                    {checkedItems[i] ? <FaCheck /> : <FaCircle />}
                  </span>
                  <span>{item}</span>
                </button>
              </li>
            ))}
          </ul>
        </TeachingCanonAccordionSection>

        <TeachingCanonAccordionSection
          sectionId={`${sectionPrefix}-section-5`}
          isOpen={openSectionId === `${sectionPrefix}-section-5`}
          onToggle={() =>
            setOpenSectionId((prev) =>
              prev === `${sectionPrefix}-section-5` ? null : `${sectionPrefix}-section-5`,
            )
          }
          kicker={blockKicker(6)}
          title={c.reflectionHeading}
        >
          <p className="tr-canon__hint">{c.reflectionHint}</p>
          <div className="tr-canon__reflections">
            {c.reflectionQuestions.map((q, i) => (
              <div key={i} className="tr-canon__reflection-item">
                <label
                  htmlFor={`${reflectionIdPrefix}-reflection-${i}`}
                  className="tr-canon__reflection-label"
                >
                  {q}
                </label>
                <textarea
                  id={`${reflectionIdPrefix}-reflection-${i}`}
                  className="tr-canon__textarea"
                  value={reflections[i] ?? ''}
                  onChange={(e) => setReflection(i, e.target.value)}
                  placeholder={c.reflectionPlaceholder}
                  rows={3}
                />
              </div>
            ))}
          </div>
        </TeachingCanonAccordionSection>

        <TeachingCanonAccordionSection
          sectionId={`${sectionPrefix}-section-6`}
          isOpen={openSectionId === `${sectionPrefix}-section-6`}
          onToggle={() =>
            setOpenSectionId((prev) =>
              prev === `${sectionPrefix}-section-6` ? null : `${sectionPrefix}-section-6`,
            )
          }
          kicker={blockKicker(7)}
          title={c.actionHeading}
        >
          <div className="tr-canon__action-card">
            <p className="tr-canon__action-text">{c.actionText}</p>
          </div>
        </TeachingCanonAccordionSection>
      </div>

      {c.reflectionQuestions.length > 0 ? (
        <TeachingCanonExtra
          title={t('app.lessons.doctrinalQuestions')}
          isOpen={openExtraId === 'questions'}
          onToggle={() =>
            setOpenExtraId((prev) => (prev === 'questions' ? null : 'questions'))
          }
          note={t('app.lessons.doctrinalQuestionsNote')}
          items={c.reflectionQuestions}
        />
      ) : null}

      {applicationItems.length > 0 ? (
        <TeachingCanonExtra
          title={t('app.lessons.realLifeApplication')}
          isOpen={openExtraId === 'application'}
          onToggle={() =>
            setOpenExtraId((prev) => (prev === 'application' ? null : 'application'))
          }
          note={t('app.lessons.realLifeApplicationNote')}
          items={applicationItems}
        />
      ) : null}
    </>
  );
}
