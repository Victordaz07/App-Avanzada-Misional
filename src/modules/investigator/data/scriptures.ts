/**
 * Investigator Scriptures Data - Bilingual Wrapper
 * PME+ Support Scriptures included
 */

import type { Locale } from '../../../i18n/locales';
import { scripturesEs } from './scriptures.es';
import { scripturesEn } from './scriptures.en';
import { scripturesTrainingEs } from './scriptures.training.es';
import { scripturesTrainingEn } from './scriptures.training.en';

export type { Locale } from '../../../i18n/locales';

// ===============================
// TYPES
// ===============================

export interface ScriptureVerse {
  verse: number;
  text: string;
}

export interface Scripture {
  id: string;
  reference: string;
  text: string;
  /** Verses for multi-verse passages; when present, modal shows verse-by-verse */
  verses?: ScriptureVerse[];
  context?: string;
}

type ScripturesContentLocale = 'es' | 'en';

function normalizeScripturesLocale(locale: Locale): ScripturesContentLocale {
  return locale === 'es' ? 'es' : 'en';
}

// ===============================
// LOCALE-AWARE ACCESS
// ===============================

/**
 * Get all scriptures for a specific locale (incluye pasajes usados solo en capacitación).
 */
export function getScripturesForLocale(locale: Locale = 'es'): Scripture[] {
  const normalizedLocale = normalizeScripturesLocale(locale);
  const base = normalizedLocale === 'en' ? scripturesEn : scripturesEs;
  const training = normalizedLocale === 'en' ? scripturesTrainingEn : scripturesTrainingEs;
  return [...base, ...training];
}

// Backward compatible default export (Spanish)
export const scriptures: Scripture[] = scripturesEs;

/**
 * Get scripture by ID with optional locale
 */
export function getScriptureById(id: string, locale: Locale = 'es'): Scripture | undefined {
  const allScriptures = getScripturesForLocale(locale);
  return allScriptures.find((s) => s.id === id);
}

/** Quita tildes para que Mosíah / Mosiah y Gálatas / Galatas resuelvan igual. */
function stripLatinDiacritics(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Normalize reference for matching (guiones, espacios, DyC/D&C, acentos, 2 Nefi → 2 Nephi).
 */
function normalizeReference(ref: string): string {
  let r = ref
    .toLowerCase()
    .replace(/\u2014/g, ' ')
    .replace(/\u2013|\u2010/g, '-') // en-dash, hyphen → hyphen
    .replace(/,\s*/g, ', ')
    .replace(/\bdyc\b/g, 'doctrine and covenants')
    .replace(/\bd&c\b/g, 'doctrine and covenants')
    .replace(/\bdoctrine and covenants\b/g, 'doctrine and covenants')
    .replace(/\bdoctrina y convenios\b/g, 'doctrine and covenants')
    .replace(/\bartículos de fe\b/g, 'artículos de fe')
    .replace(/\barticles of faith\b/g, 'articles of faith')
    .replace(/\b2 nefi\b/g, '2 nephi')
    .replace(/\b3 nefi\b/g, '3 nephi')
    .replace(/\bjose smith\b/g, 'joseph smith')
    .replace(/\bjoseph smith\s+history\b/g, 'joseph smith history')
    .replace(/\bjoseph smith\s+historia\b/g, 'joseph smith history')
    .replace(/\bjoseph smith history\b/g, 'joseph smith history')
    .replace(/\b1 timoteo\b/g, '1 timothy')
    .replace(/\b2 timoteo\b/g, '2 timothy')
    .replace(/\b1 corintios\b/g, '1 corinthians')
    .replace(/\bmateo\b/g, 'matthew')
    .replace(/\bjuan\b/g, 'john')
    .replace(/\bmarcos\b/g, 'mark')
    .replace(/\bsantiago\b/g, 'james')
    .replace(/\bfilipenses\b/g, 'philippians')
    .replace(/\befesios\b/g, 'ephesians')
    .replace(/\bhechos\b/g, 'acts')
    .replace(/\bproverbios\b/g, 'proverbs')
    .replace(/\bsalmos\b/g, 'psalms')
    .replace(/\blucas\b/g, 'luke')
    .replace(/\bhebreos\b/g, 'hebrews')
    .replace(/\bromanos\b/g, 'romans')
    .replace(/\s+/g, ' ')
    .trim();
  r = stripLatinDiacritics(r);
  // Libro Moisés (PGP) / Moses — misma clave canónica que el catálogo en inglés
  r = r.replace(/\bmoises\b/g, 'moses');
  r = r.replace(/\bgalatas\b/g, 'galatians');
  return r;
}

/**
 * Maps normalized references to scripture IDs for cross-locale lookup.
 * When baptism data shows "Mateo 3:13–17" and locale is 'en', we find by ID.
 */
const REF_TO_ID: Record<string, string> = {
  'mateo 6:9': 'matthew-6-9',
  'matthew 6:9': 'matthew-6-9',
  'mateo 3:13-17': 'matthew-3-13-17',
  'matthew 3:13-17': 'matthew-3-13-17',
  'hechos 2:38': 'acts-2-38',
  'acts 2:38': 'acts-2-38',
  'hechos 3:19-21': 'acts-3-19-21',
  'acts 3:19-21': 'acts-3-19-21',
  '2 nefi 31:5-12': '2-nephi-31-5-12',
  '2 nephi 31:5-12': '2-nephi-31-5-12',
  'juan 3:5': 'john-3-5',
  'john 3:5': 'john-3-5',
  'mosíah 18:8-10': 'mosiah-18-8-10',
  'mosiah 18:8-10': 'mosiah-18-8-10',
  'mosíah 18:8-9': 'mosiah-18-8-9',
  'mosiah 18:8-9': 'mosiah-18-8-9',
  'mosíah 18:9': 'mosiah-18-8-9',
  'mosiah 18:9': 'mosiah-18-8-9',
  'juan 13:34': 'john-13-34-35',
  'john 13:34': 'john-13-34-35',
  'doctrina y convenios 20:37': 'dc-20-37',
  'doctrine and covenants 20:37': 'dc-20-37',
  'dyc 20:37': 'dc-20-37',
  'd&c 20:37': 'dc-20-37',
  'doctrina y convenios 20:77': 'dc-20-77',
  'doctrine and covenants 20:77': 'dc-20-77',
  'dyc 20:77': 'dc-20-77',
  'd&c 20:77': 'dc-20-77',
  'doctrina y convenios 58:42-43': 'dc-58-42-43',
  'doctrine and covenants 58:42-43': 'dc-58-42-43',
  'dyc 58:42-43': 'dc-58-42-43',
  'd&c 58:42-43': 'dc-58-42-43',
  'doctrina y convenios 89:18-21': 'dc-89-18-21',
  'doctrine and covenants 89:18-21': 'dc-89-18-21',
  'dyc 89:18-21': 'dc-89-18-21',
  'd&c 89:18-21': 'dc-89-18-21',
  'moroni 10:4-5': 'moroni-10-4-5',
  'moroni 10:3-5': 'moroni-10-3-5',
  'morôni 10:3-5': 'moroni-10-3-5',
  'jeremiah 1:5': 'jeremiah-1-5',
  'jeremías 1:5': 'jeremiah-1-5',
  'jeremias 1:5': 'jeremiah-1-5',
  'genesis 3:6-7': 'genesis-3-6-7',
  'génesis 3:6-7': 'genesis-3-6-7',
  'exodus 20:8-11': 'exodus-20-8-11',
  'éxodo 20:8-11': 'exodus-20-8-11',
  'exodo 20:8-11': 'exodus-20-8-11',
  'mosíah 2:17': 'mosiah-2-17',
  'mosiah 2:17': 'mosiah-2-17',
  'moises 1:39': 'moses-1-39',
  'moses 1:39': 'moses-1-39',
  'doctrina y convenios 1:30': 'dc-1-30',
  'doctrine and covenants 1:30': 'dc-1-30',
  'dyc 1:30': 'dc-1-30',
  'd&c 1:30': 'dc-1-30',
  'doctrina y convenios 76:22': 'dc-76-22',
  'doctrine and covenants 76:22': 'dc-76-22',
  'dyc 76:22': 'dc-76-22',
  'd&c 76:22': 'dc-76-22',
  'artículos de fe 1:6': 'articles-of-faith-1-6',
  'articulos de fe 1:6': 'articles-of-faith-1-6',
  'articles of faith 1:6': 'articles-of-faith-1-6',
  'joseph smith history 1:17': 'js-history-1-17',
  'jose smith historia 1:17': 'js-history-1-17',
  '2 nephi 2:25': '2-nephi-2-25-27',
  '2 nephi 2:27': '2-nephi-2-25-27',
  'alma 34:32': 'alma-34-32',
  'doctrina y convenios 20:77, 79': 'dc-20-77-79',
  'doctrine and covenants 20:77, 79': 'dc-20-77-79',
  'dyc 20:77, 79': 'dc-20-77-79',
  'd&c 20:77, 79': 'dc-20-77-79',
  'moroni 4-5': 'moroni-4-5',
  'moroni 6:1-4': 'moroni-6-1-4',
  'moroni 6:5-6': 'moroni-6-5-6',
  'doctrina y convenios 13': 'dc-13',
  'doctrine and covenants 13': 'dc-13',
  'dyc 13': 'dc-13',
  'd&c 13': 'dc-13',
  'doctrina y convenios 20:38-60': 'dc-20-38-60',
  'doctrine and covenants 20:38-60': 'dc-20-38-60',
  'dyc 20:38-60': 'dc-20-38-60',
  'd&c 20:38-60': 'dc-20-38-60',
  'doctrina y convenios 107:1-20': 'dc-107-1-20',
  'doctrine and covenants 107:1-20': 'dc-107-1-20',
  'dyc 107:1-20': 'dc-107-1-20',
  'd&c 107:1-20': 'dc-107-1-20',
  'mateo 16:19': 'matthew-16-19',
  'matthew 16:19': 'matthew-16-19',
  'doctrina y convenios 20:59': 'dc-20-59',
  'doctrine and covenants 20:59': 'dc-20-59',
  'dyc 20:59': 'dc-20-59',
  'd&c 20:59': 'dc-20-59',
  'doctrina y convenios 84:111': 'dc-84-111',
  'doctrine and covenants 84:111': 'dc-84-111',
  'dyc 84:111': 'dc-84-111',
  'd&c 84:111': 'dc-84-111',
  'doctrina y convenios 107:85-87': 'dc-107-85-87',
  'doctrine and covenants 107:85-87': 'dc-107-85-87',
  'dyc 107:85-87': 'dc-107-85-87',
  'd&c 107:85-87': 'dc-107-85-87',
  '1 timothy 3:8-10': '1-timothy-3-8-10',
  'doctrina y convenios 58:26-28': 'dc-58-26-28',
  'doctrine and covenants 58:26-28': 'dc-58-26-28',
  'dyc 58:26-28': 'dc-58-26-28',
  'd&c 58:26-28': 'dc-58-26-28',
  'matthew 20:26-28': 'matthew-20-26-28',
  'alma 37:6-7': 'alma-37-6-7',
  'doctrina y convenios 84:106': 'dc-84-106',
  'doctrine and covenants 84:106': 'dc-84-106',
  'dyc 84:106': 'dc-84-106',
  'd&c 84:106': 'dc-84-106',
  'doctrina y convenios 121:43-44': 'dc-121-43-44',
  'doctrine and covenants 121:43-44': 'dc-121-43-44',
  'dyc 121:43-44': 'dc-121-43-44',
  'd&c 121:43-44': 'dc-121-43-44',
  'doctrina y convenios 20:53-54': 'dc-20-53-54',
  'doctrine and covenants 20:53-54': 'dc-20-53-54',
  'dyc 20:53-54': 'dc-20-53-54',
  'd&c 20:53-54': 'dc-20-53-54',
  'matthew 5:16': 'matthew-5-16',
  'philippians 2:3-4': 'philippians-2-3-4',
  'doctrina y convenios 20:46-52': 'dc-20-46-52',
  'doctrine and covenants 20:46-52': 'dc-20-46-52',
  'dyc 20:46-52': 'dc-20-46-52',
  'd&c 20:46-52': 'dc-20-46-52',
  '3 nephi 18:1-7': '3-nephi-18-1-7',
  'doctrina y convenios 84:33-39': 'dc-84-33-39',
  'doctrine and covenants 84:33-39': 'dc-84-33-39',
  'dyc 84:33-39': 'dc-84-33-39',
  'd&c 84:33-39': 'dc-84-33-39',
  'doctrina y convenios 20:41-43': 'dc-20-41-43',
  'doctrine and covenants 20:41-43': 'dc-20-41-43',
  'dyc 20:41-43': 'dc-20-41-43',
  'd&c 20:41-43': 'dc-20-41-43',
  'doctrina y convenios 18:10-16': 'dc-18-10-16',
  'doctrine and covenants 18:10-16': 'dc-18-10-16',
  'dyc 18:10-16': 'dc-18-10-16',
  'd&c 18:10-16': 'dc-18-10-16',
  'doctrina y convenios 107:13-14': 'dc-107-13-14',
  'doctrine and covenants 107:13-14': 'dc-107-13-14',
  'dyc 107:13-14': 'dc-107-13-14',
  'd&c 107:13-14': 'dc-107-13-14',
  'doctrina y convenios 20:38-45': 'dc-20-38-45',
  'doctrine and covenants 20:38-45': 'dc-20-38-45',
  'dyc 20:38-45': 'dc-20-38-45',
  'd&c 20:38-45': 'dc-20-38-45',
  'james 5:14-15': 'james-5-14-15',
  'doctrina y convenios 42:44': 'dc-42-44-45',
  'doctrine and covenants 42:44': 'dc-42-44-45',
  'dyc 42:44': 'dc-42-44-45',
  'd&c 42:44': 'dc-42-44-45',
  'doctrina y convenios 42:44-45': 'dc-42-44-45',
  'doctrine and covenants 42:44-45': 'dc-42-44-45',
  'dyc 42:44-45': 'dc-42-44-45',
  'd&c 42:44-45': 'dc-42-44-45',
  'doctrina y convenios 107:12': 'dc-107-12',
  'doctrine and covenants 107:12': 'dc-107-12',
  'dyc 107:12': 'dc-107-12',
  'd&c 107:12': 'dc-107-12',
  'mark 16:18': 'mark-16-18',
  'doctrina y convenios 121:34-46': 'dc-121-34-46',
  'doctrine and covenants 121:34-46': 'dc-121-34-46',
  'dyc 121:34-46': 'dc-121-34-46',
  'd&c 121:34-46': 'dc-121-34-46',
  'john 13:14-15': 'john-13-14-15',
  'doctrina y convenios 107:99-100': 'dc-107-99-100',
  'doctrine and covenants 107:99-100': 'dc-107-99-100',
  'dyc 107:99-100': 'dc-107-99-100',
  'd&c 107:99-100': 'dc-107-99-100',
  'alma 17:11': 'alma-17-11',
  'doctrina y convenios 58:27': 'dc-58-27',
  'doctrine and covenants 58:27': 'dc-58-27',
  'dyc 58:27': 'dc-58-27',
  'd&c 58:27': 'dc-58-27',
  'doctrina y convenios 20:60': 'dc-20-60',
  'doctrine and covenants 20:60': 'dc-20-60',
  'dyc 20:60': 'dc-20-60',
  'd&c 20:60': 'dc-20-60',
  'john 21:15-17': 'john-21-15-17',
  'ephesians 4:29': 'ephesians-4-29',
  'alma 7:11-12': 'alma-7-11-12',
};

function lookupScriptureByNormalizedReference(
  norm: string,
  locale: Locale
): Scripture | undefined {
  const id = REF_TO_ID[norm];
  if (id) {
    const byId = getScriptureById(id, locale);
    if (byId) return byId;
  }
  const allScriptures = getScripturesForLocale(locale);
  let found = allScriptures.find((s) => normalizeReference(s.reference) === norm);
  if (found) return found;
  const rangeMatch = norm.match(/^(.+:\d+)-(\d+)$/);
  if (rangeMatch) {
    const firstVerseRef = rangeMatch[1];
    found = allScriptures.find((s) => normalizeReference(s.reference) === firstVerseRef);
  }
  return found;
}

/**
 * Get scripture by reference with optional locale.
 * Maneja comas ("DyC 20:77, 79"), REF_TO_ID y rangos.
 */
export function getScriptureByReference(reference: string, locale: Locale = 'es'): Scripture | undefined {
  const trimmed = reference.trim();
  const normFull = normalizeReference(trimmed);

  let found = lookupScriptureByNormalizedReference(normFull, locale);
  if (found) return found;

  // "Doctrina y Convenios 20:77, 79" → intentar primera parte (pan) o segunda con capítulo
  if (trimmed.includes(',')) {
    const segments = trimmed.split(',').map((s) => s.trim()).filter(Boolean);
    for (const seg of segments) {
      found = lookupScriptureByNormalizedReference(normalizeReference(seg), locale);
      if (found) return found;
    }
    const first = segments[0];
    if (first) {
      const matchBook = first.match(/^(.+?)\s+(\d+):/);
      if (matchBook && segments.length > 1) {
        const rest = segments[1];
        const verseOnly = rest.match(/^\d+$/);
        if (verseOnly && matchBook[2]) {
          const combined = `${matchBook[1]} ${matchBook[2]}:${rest}`.trim();
          found = lookupScriptureByNormalizedReference(normalizeReference(combined), locale);
          if (found) return found;
        }
      }
    }
  }

  return undefined;
}

/**
 * Get daily scripture (rotates based on day of year)
 */
export function getDailyScripture(locale: Locale = 'es'): Scripture {
  const allScriptures = getScripturesForLocale(locale);
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return allScriptures[dayOfYear % allScriptures.length];
}

/**
 * Get home page scripture
 */
export function getHomeScripture(locale: Locale = 'es'): Scripture {
  const allScriptures = getScripturesForLocale(locale);
  return (
    getScriptureById('matthew-7-7', locale) ||
    allScriptures[0]
  );
}

/**
 * Get lesson detail scripture
 */
export function getLessonDetailScripture(locale: Locale = 'es'): Scripture {
  return (
    getScriptureById('john-3-16', locale) ||
    getScripturesForLocale(locale)[1]
  );
}

/**
 * Search scriptures by text content
 */
export function searchScriptures(query: string, locale: Locale = 'es'): Scripture[] {
  const allScriptures = getScripturesForLocale(locale);
  const lowerQuery = query.toLowerCase();
  return allScriptures.filter(
    (s) =>
      s.text.toLowerCase().includes(lowerQuery) ||
      s.reference.toLowerCase().includes(lowerQuery) ||
      (s.context && s.context.toLowerCase().includes(lowerQuery))
  );
}
