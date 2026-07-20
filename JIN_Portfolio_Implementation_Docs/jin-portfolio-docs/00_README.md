# JIN Portfolio — Implementation Documentation

**Working brand:** JIN / Systems in Motion  
**Product type:** Bilingual personal portfolio  
**Primary audiences:** Recruiters, freelance clients, project partners  
**Target roles:** Data Analyst, Data Scientist, Business Analyst, System Analyst, Product  
**Content source:** Version-controlled JSON repository

## 1. Purpose of this documentation set

This package is the implementation baseline for design, frontend development, content preparation, quality assurance, and deployment. It is intentionally written as an execution specification rather than an inspiration document.

The website must do three things:

1. Establish a recognizable personal brand within the first viewport.
2. Let each audience verify relevant capability with minimal navigation cost.
3. Convert interest into a traceable action: view case study, download CV, visit repository, or initiate contact.

## 2. Product principles

- **Evidence before claims:** Every capability statement must link to a project, artifact, metric, decision, or deliverable.
- **Editorial, not dashboard-like:** Avoid repeated bordered cards, generic SaaS gradients, and homogeneous component grids.
- **Creative but scannable:** Experimental composition is permitted only when hierarchy, keyboard navigation, and reading order remain clear.
- **Bilingual by architecture:** Vietnamese and English are first-class locales, not duplicated pages maintained manually.
- **JSON as the source of truth:** Project copy, metadata, capability tags, assets, links, and SEO fields are rendered from validated JSON.
- **Progressive enhancement:** Core content and navigation must remain usable without motion.
- **Performance is part of branding:** Slow or unstable interaction contradicts the intended systems-oriented positioning.

## 3. Recommended reading order

1. `01_PRODUCT_BRIEF.md`
2. `02_AUDIENCE_AND_POSITIONING.md`
3. `03_BRAND_SYSTEM.md`
4. `04_INFORMATION_ARCHITECTURE.md`
5. `05_UX_AND_USER_FLOWS.md`
6. `06_CONTENT_STRATEGY_BILINGUAL.md`
7. `07_JSON_CONTENT_MODEL.md`
8. `08_TECHNICAL_ARCHITECTURE.md`
9. `09_COMPONENT_AND_LAYOUT_SYSTEM.md`
10. `10_MOTION_AND_INTERACTION.md`
11. `11_ACCESSIBILITY.md`
12. `12_SEO_AND_SOCIAL.md`
13. `13_ANALYTICS_AND_PRIVACY.md`
14. `14_TESTING_QA.md`
15. `15_DEPLOYMENT_OPERATIONS.md`
16. `16_IMPLEMENTATION_ROADMAP.md`
17. `17_DEFINITION_OF_DONE.md`
18. `DECISIONS.md`

## 4. Package structure

```text
jin-portfolio-docs/
├── 00_README.md
├── 01_PRODUCT_BRIEF.md
├── 02_AUDIENCE_AND_POSITIONING.md
├── 03_BRAND_SYSTEM.md
├── 04_INFORMATION_ARCHITECTURE.md
├── 05_UX_AND_USER_FLOWS.md
├── 06_CONTENT_STRATEGY_BILINGUAL.md
├── 07_JSON_CONTENT_MODEL.md
├── 08_TECHNICAL_ARCHITECTURE.md
├── 09_COMPONENT_AND_LAYOUT_SYSTEM.md
├── 10_MOTION_AND_INTERACTION.md
├── 11_ACCESSIBILITY.md
├── 12_SEO_AND_SOCIAL.md
├── 13_ANALYTICS_AND_PRIVACY.md
├── 14_TESTING_QA.md
├── 15_DEPLOYMENT_OPERATIONS.md
├── 16_IMPLEMENTATION_ROADMAP.md
├── 17_DEFINITION_OF_DONE.md
├── DECISIONS.md
├── data/
│   ├── README.md
│   ├── examples/
│   └── schemas/
└── templates/
    ├── CASE_STUDY_CONTENT_TEMPLATE.md
    └── PROJECT_INTAKE_TEMPLATE.md
```

## 5. Required implementation outputs

- Responsive bilingual website.
- Home, Work index, Project detail, About, Contact, and system pages.
- JSON validation during CI/build.
- Locale-aware routes, metadata, sitemap, and canonical URLs.
- Accessible reduced-motion mode.
- Automated quality gates for lint, type checking, unit tests, E2E smoke tests, accessibility, broken links, and build.
- Production analytics with consent-aware event collection.
- Documented content update workflow.

## 6. Explicit non-goals for version 1

- User accounts or admin dashboard.
- Runtime database.
- Public commenting.
- Blog platform unless at least three high-quality articles are ready.
- 3D/WebGL as a default visual layer.
- Complex contact CRM.
- Automatic machine translation.

## 7. Initial product decision

Use **English as the default public locale** because recruiter and external-partner reach is broader, while Vietnamese remains fully equivalent and directly selectable. This is a reversible decision and must be recorded in `DECISIONS.md`.
