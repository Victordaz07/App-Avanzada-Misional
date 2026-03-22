import type { Locale } from '../../../i18n/locales';

export interface GuideTopicScriptureConfig {
  featuredReference?: string;
  sectionReferences?: string[][];
}

const guideTopicScripturesEs: Record<string, GuideTopicScriptureConfig> = {
  'sacrament-meeting': {
    featuredReference: 'Doctrina y Convenios 20:77',
    sectionReferences: [
      ['3 Nefi 18:11'],
      ['Doctrina y Convenios 20:77'],
      ['Juan 14:26'],
      ['Juan 14:15'],
    ],
  },
  'come-follow-me': {
    featuredReference: 'Alma 37:37',
    sectionReferences: [
      ['Alma 37:37'],
      ['Moroni 10:4–5'],
      ['Juan 14:26'],
    ],
  },
  ministering: {
    featuredReference: 'Mosíah 18:8–10',
    sectionReferences: [
      ['Mosíah 18:8–10'],
      ['Juan 14:15'],
      ['1 Juan 3:1'],
    ],
  },
  'personal-prayer': {
    featuredReference: 'Mateo 7:7',
    sectionReferences: [
      ['Mateo 7:7'],
      ['Juan 14:15'],
      ['Juan 14:26'],
    ],
  },
  'scripture-study': {
    featuredReference: 'Alma 37:37',
    sectionReferences: [
      ['Alma 37:37'],
      ['Moroni 10:4–5'],
      ['Juan 14:26'],
    ],
  },
  'sabbath-day': {
    featuredReference: 'Éxodo 20:8–11',
    sectionReferences: [
      ['Éxodo 20:8–11'],
      ['3 Nefi 18:11'],
      ['Mateo 11:28'],
    ],
  },
  'tithing-offerings': {
    featuredReference: 'Malaquías 3:10',
    sectionReferences: [
      ['Malaquías 3:10'],
      ['Mateo 6:21'],
      ['1 Corintios 6:19–20'],
    ],
  },
  'confirmation-gift': {
    featuredReference: 'Hechos 8:17',
    sectionReferences: [
      ['Hechos 8:17'],
      ['Juan 14:26'],
      ['Juan 14:15'],
    ],
  },
  'renewing-covenants': {
    featuredReference: 'Doctrina y Convenios 20:77',
    sectionReferences: [
      ['Doctrina y Convenios 20:77'],
      ['Doctrina y Convenios 58:42–43'],
      ['3 Nefi 18:11'],
    ],
  },
  'temple-preparation': {
    featuredReference: 'Juan 14:2',
    sectionReferences: [
      ['Hebreos 5:4'],
      ['Juan 14:2'],
      ['Mateo 19:6'],
    ],
  },
  'finding-friends': {
    featuredReference: '1 Juan 3:1',
    sectionReferences: [
      ['1 Juan 3:1'],
      ['Efesios 4:11'],
      ['Mateo 11:28'],
    ],
  },
  'asking-for-help': {
    featuredReference: 'Mateo 11:28',
    sectionReferences: [
      ['Mateo 11:28'],
      ['Santiago 1:5'],
      ['Juan 14:26'],
    ],
  },
};

const guideTopicScripturesEn: Record<string, GuideTopicScriptureConfig> = {
  'sacrament-meeting': {
    featuredReference: 'Doctrine and Covenants 20:77',
    sectionReferences: [
      ['3 Nephi 18:11'],
      ['Doctrine and Covenants 20:77'],
      ['John 14:26'],
      ['John 14:15'],
    ],
  },
  'come-follow-me': {
    featuredReference: 'Alma 37:37',
    sectionReferences: [
      ['Alma 37:37'],
      ['Moroni 10:4–5'],
      ['John 14:26'],
    ],
  },
  ministering: {
    featuredReference: 'Mosiah 18:8–10',
    sectionReferences: [
      ['Mosiah 18:8–10'],
      ['John 14:15'],
      ['1 John 3:1'],
    ],
  },
  'personal-prayer': {
    featuredReference: 'Matthew 7:7',
    sectionReferences: [
      ['Matthew 7:7'],
      ['John 14:15'],
      ['John 14:26'],
    ],
  },
  'scripture-study': {
    featuredReference: 'Alma 37:37',
    sectionReferences: [
      ['Alma 37:37'],
      ['Moroni 10:4–5'],
      ['John 14:26'],
    ],
  },
  'sabbath-day': {
    featuredReference: 'Exodus 20:8–11',
    sectionReferences: [
      ['Exodus 20:8–11'],
      ['3 Nephi 18:11'],
      ['Matthew 11:28'],
    ],
  },
  'tithing-offerings': {
    featuredReference: 'Malachi 3:10',
    sectionReferences: [
      ['Malachi 3:10'],
      ['Matthew 6:21'],
      ['1 Corinthians 6:19–20'],
    ],
  },
  'confirmation-gift': {
    featuredReference: 'Acts 8:17',
    sectionReferences: [
      ['Acts 8:17'],
      ['John 14:26'],
      ['John 14:15'],
    ],
  },
  'renewing-covenants': {
    featuredReference: 'Doctrine and Covenants 20:77',
    sectionReferences: [
      ['Doctrine and Covenants 20:77'],
      ['Doctrine and Covenants 58:42–43'],
      ['3 Nephi 18:11'],
    ],
  },
  'temple-preparation': {
    featuredReference: 'John 14:2',
    sectionReferences: [
      ['Hebrews 5:4'],
      ['John 14:2'],
      ['Matthew 19:6'],
    ],
  },
  'finding-friends': {
    featuredReference: '1 John 3:1',
    sectionReferences: [
      ['1 John 3:1'],
      ['Ephesians 4:11'],
      ['Matthew 11:28'],
    ],
  },
  'asking-for-help': {
    featuredReference: 'Matthew 11:28',
    sectionReferences: [
      ['Matthew 11:28'],
      ['James 1:5'],
      ['John 14:26'],
    ],
  },
};

export function getGuideTopicScriptureConfig(
  topicId: string,
  locale: Locale,
): GuideTopicScriptureConfig | undefined {
  const catalog = locale === 'en' ? guideTopicScripturesEn : guideTopicScripturesEs;
  return catalog[topicId];
}
