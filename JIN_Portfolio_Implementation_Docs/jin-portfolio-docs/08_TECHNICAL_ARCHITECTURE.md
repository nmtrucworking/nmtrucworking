# Technical Architecture

## 1. Recommended stack

- Framework: Next.js App Router with TypeScript.
- Styling: Tailwind CSS plus CSS custom properties for design tokens.
- Motion: Motion for React; native CSS/View Transitions only where support and fallbacks are acceptable.
- Internationalization: next-intl or an equivalent route-aware library.
- Content: local version-controlled JSON validated at build time.
- Deployment: Vercel by default; static-compatible hosting remains possible if runtime features are not used.
- Testing: Vitest, Testing Library, Playwright, axe integration.

Use compatible stable versions when initializing the project and pin them through the lockfile. Do not hard-code this specification to a package version that will become stale.

## 2. Rendering strategy

Preferred version 1 architecture:

- Static generation for home, work, project, about, privacy, and CV routes.
- Pre-generate every published project/locale route.
- Use server components for content rendering where no browser state is required.
- Use client components only for filters, locale controls, motion, and interaction.

This portfolio does not require a runtime database for version 1.

## 3. Logical architecture

```text
JSON content repository
        │
        ▼
Schema validation + reference checks
        │
        ▼
Content access layer / selectors
        │
        ├── locale resolution
        ├── project filters
        ├── related-project logic
        └── SEO derivation
        │
        ▼
Next.js route components
        │
        ├── server-rendered semantic content
        └── client interaction islands
        │
        ▼
Static output / deployment platform
```

## 4. Proposed project structure

```text
src/
├── app/
│   └── [locale]/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── work/
│       │   ├── page.tsx
│       │   └── [slug]/page.tsx
│       ├── about/page.tsx
│       ├── contact/page.tsx
│       ├── cv/page.tsx
│       ├── privacy/page.tsx
│       ├── not-found.tsx
│       └── error.tsx
├── components/
│   ├── brand/
│   ├── content-blocks/
│   ├── layout/
│   ├── navigation/
│   ├── project/
│   └── ui/
├── content/
│   ├── data/
│   ├── schemas/
│   ├── load.ts
│   ├── validate.ts
│   └── selectors.ts
├── i18n/
│   ├── routing.ts
│   ├── request.ts
│   └── navigation.ts
├── lib/
│   ├── analytics.ts
│   ├── seo.ts
│   ├── assets.ts
│   └── utils.ts
├── styles/
│   ├── globals.css
│   ├── tokens.css
│   └── motion.css
└── types/
```

## 5. Data access rules

- Page components never import raw JSON directly.
- All content passes through typed access functions.
- Localized values are resolved before presentation components receive them where practical.
- Filtering uses enums, not string matching on translated labels.
- Selectors return immutable view models.

## 6. Build pipeline

```text
Install
→ Lint JSON and source
→ Validate schemas
→ Validate references/assets/locales
→ Type check
→ Unit tests
→ Build
→ E2E smoke and accessibility checks against preview
→ Deploy production
```

## 7. Environment variables

Potential public configuration:

- Site base URL.
- Analytics provider ID.
- Feature flags for analytics/contact form.

No secret should be required for a purely static version. Never expose private tokens through public environment variables.

## 8. Asset strategy

- Store optimized source assets in a predictable public/media structure or an approved image CDN.
- Record dimensions in JSON.
- Generate responsive sources.
- Prioritize hero media carefully; do not eagerly load all project imagery.
- Use posters for video.
- Avoid autoplay video with audio.

## 9. Contact architecture

Version 1 default: direct email/social actions.

If a form is added:

- Use server-side validation.
- Add anti-spam controls.
- Avoid collecting unnecessary personal data.
- Provide explicit success/error states.
- Document retention and privacy behavior.

## 10. Error handling

- Invalid JSON: block build.
- Missing locale content: block production build for required fields.
- Missing optional media: render controlled fallback and report warning.
- Unknown slug: localized 404.
- Third-party analytics failure: site remains functional.

## 11. Architecture decision caveat

Static export is optional, not mandatory. Locale middleware, image optimization, contact forms, and other runtime features may make standard platform rendering more practical. Decide deployment mode after the initial technical spike and record it in `DECISIONS.md`.
