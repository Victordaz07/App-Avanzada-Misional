/**
 * Recorre contenido de capacitación / guías y reúne cadenas `ref`/`reference`
 * usadas con ScriptureReferenceCard. Solo para tests de cobertura de lookup.
 */

import { MANUAL_LESSONS_ES } from '../../training/lessons/content/manualLessons.es';
import { MANUAL_LESSONS_EN } from '../../training/lessons/content/manualLessons.en';
import { core1RestoreEs } from '../../training/lessons/content/core1Restore.es';
import { core1RestoreEn } from '../../training/lessons/content/core1Restore.en';
import { core2PlanOfSalvationEs } from '../../training/lessons/content/core2PlanOfSalvation.es';
import { core2PlanOfSalvationEn } from '../../training/lessons/content/core2PlanOfSalvation.en';
import { core3PriesthoodEs } from '../../training/lessons/content/core3Priesthood.es';
import { core3PriesthoodEn } from '../../training/lessons/content/core3Priesthood.en';
import { core4OrdinancesEs } from '../../training/lessons/content/core4Ordinances.es';
import { core4OrdinancesEn } from '../../training/lessons/content/core4Ordinances.en';
import { deacon1DutiesEs } from '../../training/lessons/content/deacon1Duties.es';
import { deacon1DutiesEn } from '../../training/lessons/content/deacon1Duties.en';
import { deacon2ServiceEs } from '../../training/lessons/content/deacon2Service.es';
import { deacon2ServiceEn } from '../../training/lessons/content/deacon2Service.en';
import { teacher1DutiesEs } from '../../training/lessons/content/teacher1Duties.es';
import { teacher1DutiesEn } from '../../training/lessons/content/teacher1Duties.en';
import { teacher2ReverenceEs } from '../../training/lessons/content/teacher2Reverence.es';
import { teacher2ReverenceEn } from '../../training/lessons/content/teacher2Reverence.en';
import { priest1DutiesEs } from '../../training/lessons/content/priest1Duties.es';
import { priest1DutiesEn } from '../../training/lessons/content/priest1Duties.en';
import { priest2PastoralEs } from '../../training/lessons/content/priest2Pastoral.es';
import { priest2PastoralEn } from '../../training/lessons/content/priest2Pastoral.en';
import { elder1MinistrationEs } from '../../training/lessons/content/elder1Ministration.es';
import { elder1MinistrationEn } from '../../training/lessons/content/elder1Ministration.en';
import { elder2LeadershipEs } from '../../training/lessons/content/elder2Leadership.es';
import { elder2LeadershipEn } from '../../training/lessons/content/elder2Leadership.en';
import { highPriest1KeysEs } from '../../training/lessons/content/highPriest1Keys.es';
import { highPriest1KeysEn } from '../../training/lessons/content/highPriest1Keys.en';
import { highPriest2ShepherdingEs } from '../../training/lessons/content/highPriest2Shepherding.es';
import { highPriest2ShepherdingEn } from '../../training/lessons/content/highPriest2Shepherding.en';
import { getBaptismPreparation } from './baptismPreparationData';
import { newConvertGuideEs } from '../../../vineyard/data/newConvertGuide.es';
import { newConvertGuideEn } from '../../../vineyard/data/newConvertGuide.en';
import { memberStudyModulesEs } from '../../../vineyard/data/memberStudyModules.es';
import { memberStudyModulesEn } from '../../../vineyard/data/memberStudyModules.en';

function walkRefs(value: unknown, out: Set<string>): void {
  if (value === null || value === undefined) return;
  if (typeof value !== 'object') return;

  if (Array.isArray(value)) {
    for (const item of value) walkRefs(item, out);
    return;
  }

  const o = value as Record<string, unknown>;
  if (typeof o.ref === 'string' && o.ref.trim().length > 0) {
    out.add(o.ref.trim());
  }
  if (typeof o.reference === 'string' && o.reference.trim().length > 0) {
    out.add(o.reference.trim());
  }

  for (const v of Object.values(o)) {
    if (v !== o.ref && v !== o.reference) walkRefs(v, out);
  }
}

const TRAINING_ROOTS: unknown[] = [
  ...Object.values(MANUAL_LESSONS_ES),
  ...Object.values(MANUAL_LESSONS_EN),
  core1RestoreEs,
  core1RestoreEn,
  core2PlanOfSalvationEs,
  core2PlanOfSalvationEn,
  core3PriesthoodEs,
  core3PriesthoodEn,
  core4OrdinancesEs,
  core4OrdinancesEn,
  deacon1DutiesEs,
  deacon1DutiesEn,
  deacon2ServiceEs,
  deacon2ServiceEn,
  teacher1DutiesEs,
  teacher1DutiesEn,
  teacher2ReverenceEs,
  teacher2ReverenceEn,
  priest1DutiesEs,
  priest1DutiesEn,
  priest2PastoralEs,
  priest2PastoralEn,
  elder1MinistrationEs,
  elder1MinistrationEn,
  elder2LeadershipEs,
  elder2LeadershipEn,
  highPriest1KeysEs,
  highPriest1KeysEn,
  highPriest2ShepherdingEs,
  highPriest2ShepherdingEn,
  getBaptismPreparation('es'),
  getBaptismPreparation('en'),
  newConvertGuideEs,
  newConvertGuideEn,
  ...memberStudyModulesEs,
  ...memberStudyModulesEn,
];

/** Referencias únicas presentes en contenido que abre el modal de escrituras. */
export function getAllContentScriptureRefStrings(): string[] {
  const out = new Set<string>();
  for (const root of TRAINING_ROOTS) walkRefs(root, out);
  return [...out].sort((a, b) => a.localeCompare(b));
}
