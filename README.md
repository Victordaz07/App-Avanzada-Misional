# xTheGospel (For The Gospel)

**A gospel-centered progressive web platform** to walk with people on their journey of faith, unify the investigator and member experience, and deliver **training** aligned with *Teaching in the Savior’s Way* and the General Handbook.

A single product: the experience is designed to help people come unto Jesus Christ with sound doctrine, a pastoral tone, and accessible, multilingual UI.

---

## Portfolio role

This repository highlights **front-end architecture**, **product modeling** (stage-based flows), **internationalization**, **Firebase** integration, and **Vercel** deployment—with focus on handling sensitive information responsibly and solid browser security (CSP and HTTP headers in production).

---

## What it solves

| Area | Description |
|------|-------------|
| **Unified journey** | One app with `/home`, `/lessons`, `/study`, `/journal`, `/progress`, `/profile`, `/friends`, and `/training`, with content that can change by the user’s spiritual stage (investigator / covenant member, etc.). |
| **Investigators** | Interactive lessons, study, progress, and structured doctrinal content. |
| **Members** | New-member module, friends, and support for **ward** missionary work (not full-time mission area hierarchies). |
| **Training** | Paths and tracks: foundations, teaching, priesthood, auxiliary organizations, ward leadership; prerequisite unlocks; “canon” lesson layout (doctrine, application, action blocks). |
| **Local leaders** | `/leaders/*` routes and teaching-session / leadership profile flows in the same codebase. |

> **Explicit scope:** full-time mission tools (zones, districts, APs, etc.) are **not** part of this product surface. The focus is ward, members, and investigators.

---

## Tech stack

- **React 18** + **TypeScript**
- **Vite 5** (build and dev server)
- **React Router v6**
- **Zustand** and Context API for state
- **Firebase** (Auth and client-side services)
- **Zod** for validation
- **Vitest** for unit tests
- **CSS** modules / custom design system (`styles/`, teaching-canon components)
- **Expo / React Native** in the same package for mobile evolution (`npm run start` / native targets)

**i18n:** Primary UI copy is maintained in **Spanish and English** (`app.es.json` / `app.en.json`). Older docs may mention additional languages as a product direction.

**Deployment:** From the monorepo root, `vercel.json` builds this folder and serves the SPA with rewrites and security policy (CSP, `X-Frame-Options`, etc.).

---

## Run locally

```bash
cd App-Avanzada-Misional
npm install
npm run dev
```

By default Vite uses the port in `vite.config.ts` (typically **3001**). To use another port:

```bash
npm run dev -- --port 3002
```

**Production build locally:**

```bash
npm run build
npm run preview
```

**Tests:**

```bash
npm run test
```

**i18n validation (ES/EN parity):**

```bash
npm run validate:i18n
```

Configure Firebase environment variables per your internal setup (never commit secrets).

---

## Code layout (high level)

```
App-Avanzada-Misional/
├── src/
│   ├── router/           # AppRouter, unified routes, investigator, leaders
│   ├── modules/
│   │   ├── investigator/
│   │   ├── new-member/
│   │   └── training/     # Curriculum, paths, manual lessons, unlock logic
│   ├── leaders/          # Leadership sub-app (sessions, leader auth, UI)
│   ├── i18n/
│   ├── context/
│   ├── layouts/
│   └── ...
├── vite.config.ts
└── vercel.json           # May also exist at monorepo root
```

---

## Monorepo (sibling folders)

- **`xthegospel-lidership/`** — Standalone Vite app for ward/stake leadership tools; same Firebase project where applicable.
- **`scripts/`** — Maintenance utilities (e.g. Firestore migrations with Firebase Admin).

---

## Standards and compliance

Project rules live under `.cursor/rules/` and cover **security**, **COPPA/GDPR** when minors or sensitive data apply, **Firebase** (rules, `serverTimestamp`, App Check on new functions), and **bilingual** UI and long-form content.

---

## License and use

Internal / spiritual-educational software aligned with The Church of Jesus Christ of Latter-day Saints. It does not replace official manuals or local leader direction.

---

## Author

**Víctor Ruiz Bello** — product design and architecture for this codebase.

*For your portfolio: add links to your site, LinkedIn, or a public demo here.*
