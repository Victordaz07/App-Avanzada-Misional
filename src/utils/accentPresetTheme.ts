/**
 * Single source of truth for accent preset pickers (swatches).
 * Primary / info scales in CSS are duplicated in `src/styles/accent-preset-overrides.css`
 * — when changing a preset hue, update both files (see file header there).
 *
 * Contrast (WCAG AA, approx.): primary hex values chosen so white text on solid primary
 * for buttons stays ≥ 4.5:1 in light mode; dark-mode primaries are lightened for UI on #0F1419.
 */
import type { ColorThemePresetId } from '../types/user';

/** CSS `background` for preset cards (onboarding + profile). */
export const ACCENT_PRESET_SWATCH_BY_ID: Record<ColorThemePresetId, string> = {
  default: 'linear-gradient(135deg, #3a5f8a, #2a4a6b)',
  ocean: 'linear-gradient(135deg, #0ea5e9, #0369a1)',
  forest: 'linear-gradient(135deg, #22c55e, #14532d)',
  sunset: 'linear-gradient(135deg, #fb923c, #c2410c)',
  dusk: 'linear-gradient(135deg, #a78bfa, #5b21b6)',
};

/**
 * Human-readable note for contributors: primary (#) vs white #FFFFFF contrast target.
 * Not enforced at runtime; document intent for a11y reviews.
 */
export const ACCENT_PRESET_A11Y_NOTES: Record<ColorThemePresetId, string> = {
  default: 'Light primary #1F3A5F on white UI text; CTAs use white on ~#243F6B+ — OK.',
  ocean: 'CTA fill ~#0369a1 with white text — OK (~5:1).',
  forest: 'CTA fill ~#166534 with white text — OK.',
  sunset: 'CTA fill ~#c2410c with white text — OK.',
  dusk: 'CTA fill ~#6d28d9 with white text — OK (~5:1).',
};
