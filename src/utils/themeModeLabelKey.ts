/** Clave i18n para el modo de tema claro / oscuro / sistema (app.settings.*). */
export type AppThemeMode = 'light' | 'dark' | 'system';

export type ThemeModeLabelKey =
  | 'app.settings.themeLight'
  | 'app.settings.themeDark'
  | 'app.settings.themeSystem';

export function themeModeLabelKey(mode: AppThemeMode): ThemeModeLabelKey {
  if (mode === 'light') return 'app.settings.themeLight';
  if (mode === 'dark') return 'app.settings.themeDark';
  return 'app.settings.themeSystem';
}
