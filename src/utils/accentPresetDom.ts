import {
  COLOR_THEME_PRESET_IDS,
  type ColorThemePresetId,
} from '../types/user';

/**
 * Keeps `data-accent-preset` on `<html>` aligned with stored preference.
 * `default` and invalid values remove the attribute so base `design-system.css` applies.
 */
export function syncAccentPresetDataAttribute(
  preset: ColorThemePresetId | null | undefined,
): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const valid =
    preset &&
    preset !== 'default' &&
    (COLOR_THEME_PRESET_IDS as readonly string[]).includes(preset);
  if (!valid) {
    root.removeAttribute('data-accent-preset');
    return;
  }
  root.setAttribute('data-accent-preset', preset);
}
