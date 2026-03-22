/**
 * Taxonomía canónica de volúmenes de las Escrituras (SSOT interno).
 * Etiquetas alineadas con la guía de arquitectura / localización eclesiástica del proyecto.
 * Los slugs sirven para URLs semánticas o enlaces futuros a la fuente oficial.
 */

export type ScriptureVolumeId =
  | 'VOL-01'
  | 'VOL-02'
  | 'VOL-03'
  | 'VOL-04'
  | 'VOL-05'
  | 'VOL-06';

export interface ScriptureVolume {
  id: ScriptureVolumeId;
  labelEn: string;
  labelEs: string;
  resourceSlug: string;
}

export const SCRIPTURE_VOLUMES: readonly ScriptureVolume[] = [
  {
    id: 'VOL-01',
    labelEn: 'Old Testament',
    labelEs: 'Antiguo Testamento',
    resourceSlug: '/scriptures/ot',
  },
  {
    id: 'VOL-02',
    labelEn: 'New Testament',
    labelEs: 'Nuevo Testamento',
    resourceSlug: '/scriptures/nt',
  },
  {
    id: 'VOL-03',
    labelEn: 'The Book of Mormon',
    labelEs: 'El Libro de Mormón',
    resourceSlug: '/scriptures/bofm',
  },
  {
    id: 'VOL-04',
    labelEn: 'Doctrine and Covenants',
    labelEs: 'Doctrina y Convenios',
    resourceSlug: '/scriptures/dc-testament',
  },
  {
    id: 'VOL-05',
    labelEn: 'Pearl of Great Price',
    labelEs: 'La Perla de Gran Precio',
    resourceSlug: '/scriptures/pgp',
  },
  {
    id: 'VOL-06',
    labelEn: 'Study Helps',
    labelEs: 'Ayudas de estudio',
    resourceSlug: '/scriptures/study-helps',
  },
] as const;

export function getScriptureVolumeLabel(
  volumeId: ScriptureVolumeId,
  locale: 'en' | 'es'
): string {
  const row = SCRIPTURE_VOLUMES.find((v) => v.id === volumeId);
  if (!row) return volumeId;
  return locale === 'es' ? row.labelEs : row.labelEn;
}
