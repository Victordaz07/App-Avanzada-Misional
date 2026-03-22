import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import type { ColorThemePresetId } from '../types/user';
import { syncAccentPresetDataAttribute } from './accentPresetDom';

function createMockHtmlElement(): {
  el: Pick<HTMLElement, 'setAttribute' | 'removeAttribute' | 'getAttribute'>;
  snapshot: () => Record<string, string>;
} {
  const attrs: Record<string, string> = {};
  return {
    el: {
      setAttribute(name: string, value: string) {
        attrs[name] = value;
      },
      removeAttribute(name: string) {
        delete attrs[name];
      },
      getAttribute(name: string) {
        return attrs[name] ?? null;
      },
    },
    snapshot: () => ({ ...attrs }),
  };
}

describe('syncAccentPresetDataAttribute', () => {
  beforeEach(() => {
    const { el } = createMockHtmlElement();
    vi.stubGlobal('document', { documentElement: el });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('removes attribute for default preset', () => {
    const el = document.documentElement;
    el.setAttribute('data-accent-preset', 'ocean');
    syncAccentPresetDataAttribute('default');
    expect(el.getAttribute('data-accent-preset')).toBeNull();
  });

  it('removes attribute for null/undefined', () => {
    const el = document.documentElement;
    el.setAttribute('data-accent-preset', 'forest');
    syncAccentPresetDataAttribute(undefined);
    expect(el.getAttribute('data-accent-preset')).toBeNull();
  });

  it('sets attribute for non-default presets', () => {
    const el = document.documentElement;
    syncAccentPresetDataAttribute('dusk');
    expect(el.getAttribute('data-accent-preset')).toBe('dusk');
  });

  it('removes attribute for invalid preset id', () => {
    const el = document.documentElement;
    syncAccentPresetDataAttribute('not-a-preset' as unknown as ColorThemePresetId);
    expect(el.getAttribute('data-accent-preset')).toBeNull();
  });
});
