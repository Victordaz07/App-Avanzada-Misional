import { describe, it, expect } from 'vitest';
import { getScriptureByReference } from './scriptures';
import { getAllContentScriptureRefStrings } from './collectTrainingContentRefs';

describe('content scripture refs resolve in ES and EN', () => {
  it('every ref from training, baptism and newConvert guides resolves via getScriptureByReference', () => {
    const refs = getAllContentScriptureRefStrings();
    expect(refs.length).toBeGreaterThan(0);

    const missingEs: string[] = [];
    const missingEn: string[] = [];

    for (const ref of refs) {
      if (!getScriptureByReference(ref, 'es')) missingEs.push(ref);
      if (!getScriptureByReference(ref, 'en')) missingEn.push(ref);
    }

    expect(
      { missingEs, missingEn },
      `Missing lookups:\nES (${missingEs.length}): ${missingEs.join('; ')}\nEN (${missingEn.length}): ${missingEn.join('; ')}`,
    ).toEqual({ missingEs: [], missingEn: [] });
  });
});
