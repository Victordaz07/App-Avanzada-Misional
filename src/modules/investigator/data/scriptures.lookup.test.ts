import { describe, it, expect } from 'vitest';
import { getScriptureByReference } from './scriptures';

describe('getScriptureByReference', () => {
  it('resolves Mateo 6:9 and Matthew 6:9 to the same id per locale', () => {
    const es = getScriptureByReference('Mateo 6:9', 'es');
    const en = getScriptureByReference('Matthew 6:9', 'en');
    expect(es?.id).toBe('matthew-6-9');
    expect(en?.id).toBe('matthew-6-9');
    expect(es?.reference).toMatch(/Mateo/);
    expect(en?.reference).toMatch(/Matthew/);
  });

  it('cross-resolves Moisés / Moses 1:39 via REF_TO_ID', () => {
    const viaEsForm = getScriptureByReference('Moisés 1:39', 'en');
    expect(viaEsForm?.id).toBe('moses-1-39');
    expect(viaEsForm?.reference).toMatch(/Moses/);
  });

  it('resolves core lesson refs in both locales', () => {
    expect(getScriptureByReference('Doctrina y Convenios 20:77', 'es')?.id).toBe('dc-20-77');
    expect(getScriptureByReference('Doctrine and Covenants 20:77', 'en')?.id).toBe('dc-20-77');
    expect(getScriptureByReference('Mosíah 18:8–10', 'es')?.id).toBe('mosiah-18-8-10');
    expect(getScriptureByReference('Mosiah 18:8–10', 'en')?.id).toBe('mosiah-18-8-10');
  });

  it('resolves a training-only passage by reference', () => {
    expect(getScriptureByReference('Doctrina y Convenios 1:30', 'es')?.id).toBe('dc-1-30');
    expect(getScriptureByReference('Doctrine and Covenants 1:30', 'en')?.id).toBe('dc-1-30');
  });
});
