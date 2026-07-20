# Information Architecture

## 1. Sitemap

```text
/[locale]
├── /work
│   └── /work/[slug]
├── /about
├── /contact
├── /cv
├── /privacy
├── /404
└── optional: /notes
    └── /notes/[slug]
```

Supported locales:

- `/en` — default public locale.
- `/vi` — Vietnamese.

Root `/` resolves or redirects according to the approved locale strategy. Avoid locale inference that makes URLs unpredictable.

## 2. Navigation model

### Global navigation

- Brand mark / home.
- Work.
- About.
- Contact.
- Locale switch.
- CV.

### Mobile navigation

Use a full-screen navigation layer or compact disclosure. Do not use an undersized horizontal menu.

### Case-study navigation

- Project chapter progress.
- Previous/next relevant project.
- Return to Work index.
- Persistent contact/CV action only if it does not cover content.

## 3. Homepage structure

1. **Hero / identity**
2. **Audience relevance cues**
3. **Manifesto**
4. **Selected work**
5. **Role/capability evidence map**
6. **Project index preview**
7. **Current focus / about preview**
8. **Contact closing statement**
9. **Footer utility links**

## 4. Work index

The Work page is the scannable counterbalance to the experimental homepage.

### Required controls

- Filter by target role.
- Filter by domain.
- Filter by project stage.
- Clear filters.

### Required data columns or visible metadata

- Project name.
- Year.
- Primary role.
- Domain.
- Stage.
- Key outcome or deliverable.

Filters must be URL-addressable when practical so recruiter links can preserve context.

## 5. Project detail structure

1. Project identity and summary.
2. Stage/status disclosure.
3. Context.
4. Problem.
5. Personal role and team context.
6. Constraints.
7. Evidence/inputs.
8. Key decisions.
9. Process or system architecture.
10. Outputs.
11. Validation and impact.
12. Limitations.
13. What would change next.
14. Related project/contact action.

Sections may be visually reorganized, but the semantic sequence should remain coherent.

## 6. About page

Required content:

- Current positioning.
- Working method.
- Capability evidence by role.
- Selected timeline.
- Education/current learning.
- Collaboration principles.
- CV and contact action.

Avoid a long autobiography. Keep personal information relevant to professional evaluation.

## 7. Contact page

Version 1 can use direct channels rather than a complex form:

- Email.
- LinkedIn.
- GitHub.
- Optional Zalo for Vietnamese freelance inquiries.

Provide engagement intents:

- Hiring / role discussion.
- Freelance project.
- Project collaboration.

## 8. CV route

The CV route should provide:

- Current downloadable PDF.
- Locale-specific CV if available.
- Updated date.
- Basic HTML summary for accessibility and searchability.

Do not embed only a PDF viewer without an alternative.

## 9. Error and empty states

- Localized 404.
- Invalid project slug.
- Missing optional media.
- No results after filters.
- Invalid locale.
- JSON validation failure must block production build rather than render partial corrupt content.

## 10. URL conventions

- Lowercase kebab-case slugs.
- Stable slug independent of localized title.
- Avoid year in slug unless required for disambiguation.
- Canonical locale-specific paths.
