import type { ColorThemePresetId } from '../types/user';
import { ACCENT_PRESET_SWATCH_BY_ID } from './accentPresetTheme';

/** CSS `background` values for accent preset pickers (onboarding + profile). */
export const ACCENT_PRESET_SWATCHES: Record<ColorThemePresetId, string> =
  ACCENT_PRESET_SWATCH_BY_ID;
