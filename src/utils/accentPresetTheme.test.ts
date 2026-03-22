import { describe, it, expect } from 'vitest';
import {
  ACCENT_PRESET_SWATCH_BY_ID,
  ACCENT_PRESET_A11Y_NOTES,
} from './accentPresetTheme';
import { COLOR_THEME_PRESET_IDS } from '../types/user';

describe('accentPresetTheme SSOT', () => {
  it('has swatch + a11y note for every preset id', () => {
    for (const id of COLOR_THEME_PRESET_IDS) {
      expect(typeof ACCENT_PRESET_SWATCH_BY_ID[id]).toBe('string');
      expect(ACCENT_PRESET_SWATCH_BY_ID[id].length).toBeGreaterThan(10);
      expect(typeof ACCENT_PRESET_A11Y_NOTES[id]).toBe('string');
      expect(ACCENT_PRESET_A11Y_NOTES[id].length).toBeGreaterThan(5);
    }
  });
});
