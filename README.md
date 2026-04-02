# xTheGospel (For The Gospel)

**Plataforma web progresiva centrada en el Evangelio** para acompañar a personas en su camino de fe, unificar el recorrido de investigadores y miembros, y ofrecer **capacitación** alineada a *Enseñar a la manera del Salvador* y al Manual General.

Proyecto pensado como producto único: la experiencia gira en torno a acercar a las personas a Jesucristo con rigor doctrinal, tono pastoral y diseño accesible y multilingüe.

---

## Rol en mi portafolio

Este repositorio muestra trabajo de **arquitectura front-end**, **modelado de producto** (flujos por etapas del usuario), **internacionalización**, integración con **Firebase** y despliegue en **Vercel**, con énfasis en claridad de información sensible y buenas prácticas de seguridad en navegador (CSP y cabeceras HTTP en producción).

---

## Qué resuelve

| Área | Descripción |
|------|-------------|
| **Recorrido unificado** | Una sola aplicación con rutas `/home`, `/lessons`, `/study`, `/journal`, `/progress`, `/profile`, `/friends` y `/training`, donde el contenido puede cambiar según la etapa espiritual del perfil (investigador / miembro convenido, etc.). |
| **Investigadores** | Lecciones interactivas, estudio, progreso y contenido doctrinal estructurado. |
| **Miembros** | Módulo “new member” / vínculo con amigos y apoyo a la misión local de barrio (no orientado a jerarquías de misión de tiempo completo). |
| **Capacitación** | Hub de rutas y pistas: fundamentos, enseñanza, sacerdocio, organizaciones auxiliares, liderazgo en barrio; desbloqueo por prerrequisitos; lecciones con layout “canon” (bloques de doctrina, aplicación, acción). |
| **Líderes locales** | Rutas `/leaders/*` y flujos de sesiones de enseñanza y perfil de liderazgo dentro de la misma base de código. |

> **Alcance explícito:** no forma parte de la superficie del producto la app de misión de tiempo completo (distritos, zonas, AP, etc.). El foco es barrio, miembros e investigadores.

---

## Stack técnico

- **React 18** + **TypeScript**
- **Vite 5** (build y dev server)
- **React Router v6**
- **Zustand** y Context API para estado
- **Firebase** (Auth y servicios integrados en cliente)
- **Zod** para validación
- **Vitest** para pruebas unitarias
- **CSS** modular / sistema de estilos propio (`styles/`, componentes canon de enseñanza)
- Base **Expo / React Native** en el mismo paquete para evolución mobile (`npm run start` / entornos nativos)

**i18n:** UI y copy principal en **español e inglés** (`app.es.json` / `app.en.json`); el README histórico del proyecto menciona más idiomas como dirección de producto.

**Despliegue:** desde la raíz del monorepo, `vercel.json` compila esta carpeta y sirve la SPA con rewrites y política de seguridad (CSP, `X-Frame-Options`, etc.).

---

## Cómo ejecutarlo en local

```bash
cd App-Avanzada-Misional
npm install
npm run dev
```

Por defecto Vite usa el puerto definido en `vite.config.ts` (típicamente **3001**). Puedes forzar otro puerto, por ejemplo:

```bash
npm run dev -- --port 3002
```

**Producción local:**

```bash
npm run build
npm run preview
```

**Pruebas:**

```bash
npm run test
```

**Validación de traducciones (ES/EN):**

```bash
npm run validate:i18n
```

Configura las variables de entorno de Firebase según la documentación interna del proyecto (sin commitear secretos).

---

## Estructura relevante del código

```
App-Avanzada-Misional/
├── src/
│   ├── router/           # AppRouter, rutas unificadas, investigador, líderes
│   ├── modules/
│   │   ├── investigator/
│   │   ├── new-member/
│   │   └── training/     # Currículo, paths, lecciones manuales, unlock logic
│   ├── leaders/          # Sub-app de liderazgo (sesiones, auth de líderes, UI)
│   ├── i18n/
│   ├── context/
│   ├── layouts/
│   └── ...
├── vite.config.ts
└── vercel.json           # También puede existir uno en la raíz del monorepo
```

---

## Monorepo

En el directorio padre suele convivir:

- **`xthegospel-lidership/`** — aplicación Vite separada para herramientas de liderazgo de barrio/estaca, mismo ecosistema Firebase.
- **`scripts/`** — utilidades (por ejemplo migraciones con Firebase Admin).

---

## Buenas prácticas y cumplimiento

En el repositorio hay reglas de proyecto (p. ej. en `.cursor/rules/`) orientadas a **seguridad**, **COPPA/GDPR** cuando hay datos sensibles, **Firebase** (reglas, timestamps, App Check en funciones nuevas) y **contenido bilingüe** obligatorio para cadenas de UI y material largo coordinado.

---

## Licencia y uso

Software de uso interno / espiritual-educativo, alineado al propósito de la Iglesia de Jesucristo de los Santos de los Últimos Días. No sustituye los manuales oficiales ni la orientación de autoridades locales.

---

## Autor

**Víctor Ruiz Bello** — diseño de producto y arquitectura de esta línea de código.

*Para portafolio: añade aquí enlaces a tu sitio, LinkedIn o demo en vivo si son públicos.*
