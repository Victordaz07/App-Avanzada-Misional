## Idiomas soportados

- `en` (default / fallback en `I18nContext`)
- `es`

## Convenciones

- La lista oficial está en `src/i18n/locales.ts`.
- `app.*`, `member.*` y `missionary.*` deben tener **paridad de claves** entre `es` y `en` (validar con `npm run validate:i18n`).
- Contenido largo por flujo puede vivir en TS (`guideTopics.*`, `training/lessons/content/*`, datos del viñedo) siempre con variantes `es`/`en`.
