# JIN Portfolio — Master Implementation Specification
> Consolidated edition. The ZIP package remains the source set for implementation, schemas, templates and sample data.


---

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

---

# Product Brief

## 1. Product statement

JIN Portfolio is a bilingual, editorial-technology website that presents Jin as a cross-functional practitioner working across data, systems, business analysis, and product delivery.

It is not a general gallery. It is an evidence system that helps different audiences answer:

- What problems can Jin solve?
- What role did Jin actually perform?
- How does Jin reason about constraints and trade-offs?
- What outputs can Jin deliver?
- Is there enough evidence to contact, shortlist, or collaborate with Jin?

## 2. Product objectives

### O1 — Recognition
A first-time visitor should identify the brand, professional territory, and current availability within 10 seconds.

### O2 — Relevance
A visitor should reach at least one project relevant to their intent within two meaningful interactions.

### O3 — Verification
Each target role must be supported by evidence from at least two projects or artifacts.

### O4 — Conversion
The site must expose clear actions for CV download, project inquiry, freelance inquiry, GitHub review, and direct contact.

### O5 — Maintainability
Adding a project or changing localized copy must not require editing page components.

## 3. Success metrics

Metrics are diagnostic, not vanity targets.

| Objective | Metric | Initial benchmark |
|---|---|---:|
| Recognition | Hero-to-work interaction rate | Track baseline first |
| Relevance | Project detail view rate | Track by audience source |
| Verification | Case-study completion proxy | 50% and 90% scroll events |
| Conversion | Qualified contact action rate | Track by CTA type |
| Recruiter utility | CV download rate | Segment by locale/referrer |
| Maintainability | Content-only deployment success | 100% validated JSON builds |
| Quality | Production accessibility violations | 0 critical/serious |
| Performance | Core experience budget | Defined in performance spec |

Do not assign numeric growth claims before production traffic establishes a baseline.

## 4. Core value proposition

> A structured view of how Jin transforms ambiguous problems into evidence-based data, system, and product decisions.

## 5. Scope for version 1

### Required

- Brand-led homepage.
- Selected work with 4–6 flagship projects.
- Complete project index with role/domain filters.
- Case-study detail pages.
- About and capability evidence map.
- Bilingual content.
- CV download and contact actions.
- JSON content layer with schemas.
- SEO and social metadata.
- Analytics and quality gates.

### Optional after launch

- Notes/articles.
- Interactive data visualizations tied to real projects.
- Password-protected private case studies.
- Lightweight project inquiry form.

## 6. Constraints

- Multiple target roles can dilute positioning.
- Project evidence may be uneven: some projects have implementation artifacts, others only design or architecture.
- Claims about impact may lack production baselines.
- Bilingual maintenance doubles editorial review, even when the data structure is shared.
- Motion-heavy art direction can conflict with performance and accessibility.

## 7. Resolution of the multi-role problem

The website must not present five disconnected identities. Use one umbrella positioning:

> **Data-informed systems and products**

Role labels are treated as visitor filters and evidence lenses:

- DA: analysis, reporting, decision support.
- DS: modeling, experimentation, recommendation, evaluation.
- BA: requirements, process, stakeholders, business rules.
- SA: architecture, integration, data flow, non-functional requirements.
- Product: problem framing, prioritization, UX, delivery decisions.

## 8. Acceptance summary

The product is ready for development when:

- Information architecture is approved.
- Brand tokens are implemented in a design file or token source.
- At least four projects satisfy the project content minimum.
- Both locale dictionaries pass editorial review.
- JSON schemas validate sample data.
- No open P0 product decision remains.

---

# Audience and Positioning

## 1. Audience model

### A. Recruiter / hiring manager

**Primary questions**

- Which role is the candidate suitable for now?
- What work was personally owned?
- Are the skills evidenced or self-declared?
- Can the candidate communicate complex work clearly?
- Is the CV immediately accessible?

**Preferred path**

Home → Role-relevant work → Case study → About/CV → Contact

**Required evidence**

- Explicit personal role.
- Scope and constraints.
- Deliverables.
- Tools and methods only where relevant.
- Measured outcomes or honest validation status.

### B. Freelance client

**Primary questions**

- Does Jin understand the business problem?
- What services and outputs are available?
- What type of engagement is suitable?
- Is there a credible process and contact route?

**Preferred path**

Home → Capabilities/services → Relevant project → Engagement model → Contact

**Required evidence**

- Problem-to-output mapping.
- Typical deliverables.
- Constraints and exclusions.
- Response channel and expected response time.

### C. Project partner

**Primary questions**

- What domain and project types fit?
- What can Jin own versus support?
- How does Jin collaborate and document decisions?
- Are current projects or research directions compatible?

**Preferred path**

Home → Current focus → Project/system evidence → Collaboration model → Contact

**Required evidence**

- Current focus.
- Working principles.
- Architecture/process artifacts.
- Collaboration expectations.

## 2. Positioning architecture

### Master positioning

**English**

> I design data-informed systems and products, turning ambiguous problems into structures teams can understand, build, and evaluate.

**Vietnamese**

> Tôi thiết kế hệ thống và sản phẩm dựa trên dữ liệu, chuyển các vấn đề chưa rõ ràng thành cấu trúc mà đội ngũ có thể hiểu, triển khai và đánh giá.

### Supporting line

> Information Systems × Data × Product

### Brand concept

> **Systems in Motion** — systems are not static diagrams; they are decisions, flows, feedback loops, and human interactions in operation.

## 3. Message hierarchy

1. **What:** Data-informed systems and products.
2. **How:** Structured analysis, evidence, architecture, and delivery.
3. **Proof:** Selected case studies and artifacts.
4. **Range:** DA, DS, BA, SA, Product lenses.
5. **Action:** Hire, collaborate, or discuss a project.

## 4. Role lens matrix

| Evidence type | DA | DS | BA | SA | Product |
|---|:---:|:---:|:---:|:---:|:---:|
| Dashboard/analysis | Primary | Support | Support | — | Support |
| Model/evaluation | Support | Primary | — | Support | Support |
| Requirements/business rules | Support | — | Primary | Support | Primary |
| Architecture/integration | — | Support | Support | Primary | Support |
| UX/roadmap/prioritization | Support | — | Support | Support | Primary |
| Outcome/validation | Primary | Primary | Primary | Primary | Primary |

The interface may filter by role, but project content must not be rewritten into contradictory role-specific narratives.

## 5. Voice and tone

### Voice

- Precise.
- Evidence-oriented.
- Reflective without self-deprecation.
- Technical where needed, readable by non-specialists.

### Avoid

- “Passionate about…” without proof.
- “Expert” unless independently defensible.
- Unqualified impact claims.
- Tool lists detached from outcomes.
- Inflated team achievements presented as personal work.

### Claim format

Use:

> Designed the tenant membership model and documented role constraints for a multi-organization SaaS baseline.

Avoid:

> Built a revolutionary enterprise platform that transformed operations.

## 6. Homepage audience routing

The first screen must not show three separate personas as three bordered cards. Use contextual text links embedded in the narrative:

- **Hiring for a role?** View work by capability.
- **Planning a project?** Review services and delivery outputs.
- **Exploring collaboration?** See current focus and open directions.

## 7. Evidence priority

1. Deployed product or working prototype.
2. Repository or implementation artifact.
3. Architecture, analysis, or validated design artifact.
4. Test result, user feedback, or measured metric.
5. Planned work clearly labeled as planned.

## 8. Positioning risks

### Risk: “Generalist without depth”
Mitigation: each flagship project should emphasize one primary role and no more than two secondary roles.

### Risk: “Creative site hides employability”
Mitigation: add a compact Work Index and printable CV route.

### Risk: “Student portfolio overstates impact”
Mitigation: distinguish `production`, `prototype`, `concept`, and `academic` project stages in JSON and UI.

---

# Brand System

## 1. Brand foundation

**Brand name:** JIN  
**System line:** Systems in Motion  
**Descriptor:** Information Systems × Data × Product

The visual system should express movement, structured reasoning, and cross-domain connection. It must not resemble a generic analytics dashboard or a template-based creative agency site.

## 2. Visual principles

### 2.1 Typographic authority
Large typography establishes hierarchy and identity. Typography is structural, not decorative.

### 2.2 Controlled asymmetry
Layouts may break symmetry while remaining aligned to a consistent grid and reading order.

### 2.3 Flow over boxes
Use section transitions, whitespace, background fields, rules, masks, and connected paths instead of enclosing every item in a border.

### 2.4 Evidence as visual material
Architecture snippets, process diagrams, data fragments, decision logs, and project artifacts may become part of the composition.

### 2.5 Motion with semantic purpose
Motion should reveal hierarchy, continuity, selection, or system state.

## 3. Color tokens

### Core palette

| Token | Value | Purpose |
|---|---|---|
| `--color-canvas` | `#F2F0E9` | Primary light background |
| `--color-ink` | `#121310` | Primary text |
| `--color-signal` | `#C8FF36` | Brand accent / active state |
| `--color-graphite` | `#191B18` | Dark sections |
| `--color-muted` | `#71756D` | Secondary text |
| `--color-line` | `#C9CBC3` | Sparse separators |
| `--color-paper` | `#FAF9F5` | Raised editorial field |
| `--color-danger` | `#B42318` | Errors only |
| `--color-success` | `#157A48` | Success only |

### Usage constraints

- Signal color should occupy less than approximately 10% of a typical viewport.
- Do not use signal color for long text.
- Do not communicate state by color alone.
- Avoid introducing project-specific colors globally; keep them scoped to case studies.

## 4. Typography

### Recommended families

- Display: Bricolage Grotesque or approved distinctive variable grotesk.
- Body/UI: Geist or Inter.
- Technical labels: IBM Plex Mono.

Use self-hosting or framework font optimization where licensing permits. Do not distribute font files in the documentation repository unless the license explicitly permits it.

### Type scale

Use fluid values with `clamp()`.

| Token | Intended use |
|---|---|
| `display-xl` | Hero identity |
| `display-lg` | Section title |
| `heading-1` | Page title |
| `heading-2` | Case-study chapter |
| `heading-3` | Component heading |
| `body-lg` | Manifesto / lead |
| `body-md` | Standard content |
| `body-sm` | Metadata |
| `label` | Mono technical label |

### Rules

- Body line length: target 55–75 characters.
- Do not use all caps for paragraphs.
- Mono text is for metadata and system language, not the entire interface.
- Vietnamese diacritics must be verified in every selected font weight.

## 5. Grid and spacing

### Desktop

- 12-column grid.
- Outer margin: fluid, minimum 24 px.
- Content max width: 1600 px.
- Text column: 5–7 columns depending on context.

### Tablet

- 8-column grid.
- Preserve editorial offsets only where reading order remains clear.

### Mobile

- 4-column grid.
- Collapse decorative overlap before reducing body readability.

### Spacing system

Use a tokenized nonlinear scale. Section spacing should be substantially larger than component spacing. Do not solve hierarchy with borders.

## 6. Shape language

Allowed:

- Full-bleed rectangles for media.
- Thin rules.
- Curved masks with restrained radius.
- Cropped circles or ellipses as signal nodes.
- Irregular clipping only when it maps to the brand flow concept.

Avoid:

- Repeated 16–24 px rounded cards.
- Glassmorphism panels.
- Excessive pill labels.
- Thick borders around every content unit.

## 7. Iconography

- Use a consistent stroke system.
- Prefer arrows, nodes, coordinates, and directional marks.
- Use icons only where meaning is faster than text.
- Social icons must include accessible labels.

## 8. Imagery

Project imagery may include:

- Final UI or product photography.
- Architecture and data-flow diagrams.
- Process artifacts.
- Contextual photography.
- Carefully cropped screenshots.

Rules:

- Every image needs meaningful alt text or an empty alt for decorative use.
- Do not present low-fidelity planning artifacts as finished outcomes.
- Label concept renders and mockups.
- Use consistent asset naming and aspect-ratio metadata.

## 9. Brand motif: signal flow

The signal flow is a reusable visual grammar:

```text
INPUT → INTERPRET → STRUCTURE → BUILD → EVALUATE
```

It may appear as:

- Section progress.
- Project phase navigation.
- Capability connections.
- Hover path between role and evidence.
- Loading skeleton direction.

It must never obstruct content or become a continuous distracting animation.

## 10. Theming

Version 1 should implement:

- Primary light editorial theme.
- Dark project sections or optional dark theme.
- System theme support only if both themes are quality-assured.

A theme toggle is not mandatory. A poorly implemented dark theme creates more inconsistency than value.

---

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

---

# UX and User Flows

## 1. UX objectives

- Communicate identity quickly.
- Support both exploration and rapid scanning.
- Expose evidence at the point of each claim.
- Preserve orientation during creative transitions.
- Make language switching predictable.

## 2. Primary flow — recruiter

```text
Entry from CV/search/referral
→ Understand role territory in hero
→ Open Work or select role lens
→ Scan project index
→ Open relevant case study
→ Verify role, decisions, outputs, evidence
→ Download CV / contact
```

### Acceptance criteria

- CV is reachable from every primary page.
- Primary role and personal contribution appear above the first major project fold.
- Project stage is visible before impact claims.
- Recruiter can disable or bypass elaborate motion.

## 3. Primary flow — freelance client

```text
Entry from social/referral
→ Understand problem domains
→ Review capability-to-deliverable mapping
→ Open relevant project
→ Review process, limitations and outputs
→ Select project inquiry contact action
```

### Acceptance criteria

- Services are expressed as outcomes/deliverables, not only job titles.
- Contact action carries an intent parameter or prefilled subject where supported.
- No price or delivery promise is shown unless intentionally maintained.

## 4. Primary flow — project partner

```text
Entry from shared project link
→ Review current focus
→ Inspect system/process evidence
→ Understand collaboration role
→ Open repository/artifact
→ Initiate collaboration contact
```

### Acceptance criteria

- External artifacts open with clear labels.
- Private/unavailable repositories are not shown as broken links.
- Collaboration expectations are explicit.

## 5. Locale switching flow

```text
Current localized route
→ Select locale
→ Resolve same content entity in target locale
→ Preserve page and project slug
→ Update metadata and document language
```

Fallback policy:

- Required public content must exist in both locales.
- Missing optional long-form content may show a clearly labeled fallback only during development.
- Production must not silently mix Vietnamese and English within a content section.

## 6. Work filtering flow

```text
Open Work
→ Select one or more filters
→ Results update
→ URL/query state updates
→ Open project
→ Back returns to preserved filter state
```

### Rules

- Filter buttons must expose selected state programmatically.
- Empty results provide clear-reset action.
- Role filters are evidence lenses, not claims that every project represents every role.

## 7. Case-study reading modes

### Scan mode

For visitors with limited time:

- Summary.
- Role.
- Challenge.
- Key decision.
- Output.
- Validation.

### Deep mode

For technical or project evaluation:

- Architecture.
- Data/model details.
- Requirements/business rules.
- Trade-offs.
- Limitations.
- Artifacts.

Use chapter navigation and progressive disclosure rather than hiding essential content in hover-only interactions.

## 8. Interaction constraints

- No essential information only on hover.
- No scroll hijacking.
- No horizontal scroll requirement for core content on mobile.
- Cursor replacement must not remove native pointer semantics.
- Parallax amplitude should remain low and be removed under reduced-motion preferences.
- Auto-advancing media requires pause/control.

## 9. UX content states

Every project must clearly label one stage:

- `production`
- `prototype`
- `concept`
- `academic`
- `archived`

Every impact item must label one evidence state:

- `measured`
- `validated`
- `observed`
- `expected`
- `not-yet-evaluated`

## 10. Conversion events

- `view_project`
- `filter_work`
- `download_cv`
- `open_repository`
- `open_artifact`
- `contact_email`
- `contact_linkedin`
- `switch_locale`
- `case_study_50`
- `case_study_90`

Do not interpret clicks as successful hiring or collaboration outcomes without downstream evidence.

---

# Bilingual Content Strategy

## 1. Locale model

Supported locale identifiers:

```json
["en", "vi"]
```

Default locale: `en`.

English and Vietnamese are editorial equivalents, not literal line-by-line translations. Meaning, evidence, dates, names, and claims must remain consistent.

## 2. Content separation

### Neutral shared data

Store once:

- IDs and slugs.
- Dates.
- Role enums.
- Domain enums.
- Stage.
- Technology identifiers.
- Metrics and evidence status.
- Asset paths and dimensions.
- External URLs.
- Ordering and feature flags.

### Localized data

Store per locale:

- Titles.
- Summaries.
- Problem statements.
- Decisions and explanations.
- Captions and alt text.
- SEO title/description.
- CTA labels.
- Navigation labels.

## 3. Recommended file model

```text
data/
├── site.json
├── profile.json
├── projects.json
├── messages.en.json
└── messages.vi.json
```

Project-localized narratives can use either:

### Option A — locale map in one project object

Best for atomic project editing and consistency checks.

```json
{
  "title": {"en": "Operations Hub", "vi": "Operations Hub"},
  "summary": {
    "en": "A tenant-first operations platform.",
    "vi": "Nền tảng vận hành theo kiến trúc đa tổ chức."
  }
}
```

### Option B — shared project file plus locale files

Best when case studies become long and editorial ownership differs.

Version 1 decision: use **Option A** for project metadata and structured case-study blocks; use message dictionaries for shared UI text.

## 4. Editorial rules

- Preserve product names and technical standards unless an accepted Vietnamese term exists.
- Translate role explanations, not necessarily role abbreviations.
- Use consistent date formats per locale.
- Use Vietnamese punctuation and capitalization conventions.
- Do not translate repository names, route slugs, or code identifiers.
- Avoid English buzzwords inside Vietnamese copy when a precise Vietnamese expression is available.

## 5. Claim governance

Each case-study claim should be classifiable as:

- `fact`: directly documented.
- `metric`: numeric evidence with source/context.
- `interpretation`: reasoned conclusion.
- `proposal`: recommended future state.

The UI does not need to expose these labels everywhere, but the data model should preserve evidence status for review.

## 6. Minimum project content

A project cannot be featured until it has, in both locales:

- Title and one-sentence summary.
- Project stage.
- Domain.
- Primary role and personal contribution.
- Problem.
- At least two decisions.
- At least two outputs/artifacts.
- Validation or explicit absence of validation.
- Limitation/reflection.
- Hero asset with alt text.
- SEO title and description.

## 7. Homepage copy length budgets

| Field | English | Vietnamese |
|---|---:|---:|
| Hero headline | 6–14 words | 8–18 words |
| Project summary | 15–35 words | 20–45 words |
| Manifesto lead | 35–70 words | 45–90 words |
| CTA | 2–5 words | 2–7 words |
| SEO description | about 120–160 chars | about 120–170 chars |

These are layout budgets, not search-engine guarantees.

## 8. Translation workflow

1. Write source content from evidence.
2. Review claim accuracy.
3. Translate/adapt.
4. Compare factual equivalence.
5. Validate JSON.
6. Preview both locales at desktop and mobile widths.
7. Review text overflow and line breaks.
8. Approve content status.

## 9. Content status enum

- `draft`
- `review`
- `approved`
- `published`
- `archived`

Production build should include only `published` public projects unless an explicit preview mode is active.

---

# JSON Content Model

## 1. Goals

- Separate content from rendering logic.
- Make projects sortable, filterable, and localizable.
- Prevent invalid or incomplete content from reaching production.
- Support static generation and predictable SEO metadata.
- Preserve evidence status and personal contribution.

## 2. Root entities

### `site`
Global settings, routes, navigation, contact links, analytics flags, and default SEO.

### `profile`
Identity, positioning, current focus, timeline, capabilities, availability, and CV assets.

### `projects`
All project metadata and structured case-study content.

### `messages`
Shared interface labels by locale.

## 3. Identifier rules

- IDs are immutable machine identifiers.
- Slugs are stable and locale-neutral.
- Display titles are localized.
- Asset IDs reference asset records rather than duplicating paths where possible.

## 4. Project model

Core fields:

```text
id
slug
status
stage
visibility
featured
order
yearStart
yearEnd
domains[]
roles.primary
roles.secondary[]
capabilities[]
technologies[]
team
contribution
localized
assets[]
links[]
caseStudy[]
metrics[]
seo
```

## 5. Structured case-study blocks

Use a typed block model instead of one giant HTML string.

Supported initial blocks:

- `text`
- `lead`
- `quote`
- `media`
- `gallery`
- `metric`
- `decision`
- `process`
- `architecture`
- `table`
- `artifact-links`
- `reflection`

Each block must have:

- Stable `id`.
- `type`.
- Localized heading where needed.
- Localized body/caption.
- Optional visual configuration constrained by schema.

Do not store arbitrary JSX or executable code in public JSON.

## 6. Evidence model

```json
{
  "claimType": "metric",
  "evidenceStatus": "measured",
  "value": 19,
  "unit": "months",
  "context": {
    "en": "Projected break-even period from the financial model.",
    "vi": "Thời gian hòa vốn dự kiến theo mô hình tài chính."
  },
  "source": "artifact:senova-financial-model"
}
```

A projected value must not be labeled `measured`.

## 7. Asset model

Required metadata:

- `id`
- `src`
- `type`
- `width`
- `height`
- localized `alt`
- optional localized caption
- `purpose`: hero, gallery, diagram, thumbnail, og
- `status`: final, prototype, concept, placeholder

## 8. Link model

```json
{
  "type": "repository",
  "url": "https://...",
  "visibility": "public",
  "label": {"en": "View repository", "vi": "Xem mã nguồn"}
}
```

Do not render private or missing links.

## 9. Validation policy

- Validate all JSON against JSON Schema during local development and CI.
- Fail build on schema errors.
- Fail build when featured content lacks required localized fields.
- Warn on duplicate slugs, duplicate IDs, broken internal references, missing asset files, and unpublished featured projects.
- Check that every role/capability enum is recognized.

## 10. Derived data

Do not manually maintain values that can be derived:

- Available filters.
- Related projects.
- Project count by role.
- Sitemap paths.
- Previous/next project.
- Timeline sorting.

## 11. Security constraints

- Treat JSON strings as untrusted content.
- Do not permit embedded scripts.
- Sanitize any optional rich text renderer.
- Use allowlisted external link protocols.
- Avoid storing private contact details not intended for publication.

## 12. Example and schemas

See:

- `data/examples/`
- `data/schemas/`
- `data/README.md`

---

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

---

# Component and Layout System

## 1. Component philosophy

Components should encode semantics and behavior, not force every section into the same visual container.

Bad abstraction:

```text
<Card title icon tags border radius shadow>
```

Preferred abstractions:

- `EditorialSection`
- `ProjectChapter`
- `MediaField`
- `EvidenceLine`
- `SignalPath`
- `RoleLens`
- `ProjectIndexRow`

## 2. Component layers

### Foundation

- `Container`
- `Grid`
- `Stack`
- `Cluster`
- `Rule`
- `VisuallyHidden`

### Brand

- `Wordmark`
- `SignalNode`
- `SignalPath`
- `CoordinateLabel`
- `SectionMarker`

### Navigation

- `GlobalNav`
- `LocaleSwitcher`
- `MobileNav`
- `CaseStudyProgress`
- `Breadcrumbs`
- `SkipLink`

### Content

- `LocalizedText`
- `Lead`
- `RichText`
- `QuoteBlock`
- `MetricBlock`
- `DecisionBlock`
- `ArtifactLinkList`
- `ReflectionBlock`

### Project

- `ProjectHero`
- `SelectedProjectChapter`
- `ProjectIndex`
- `ProjectFilter`
- `RoleBadge` — sparse use only.
- `StageLabel`
- `ProjectMedia`
- `RelatedProject`

### Utility

- `ButtonLink`
- `TextLink`
- `IconLink`
- `ExternalLink`
- `DownloadLink`
- `ErrorState`
- `EmptyState`

## 3. Layout patterns

### Hero split-field

Large identity text occupies the primary field; metadata anchors the edges. Avoid a centered card.

### Full-bleed project chapter

Media occupies 7–9 desktop columns with overlapping or offset title. Mobile collapses to linear order.

### Editorial text-media

Text width remains constrained even when media is full width.

### Index row

Rows use typography, spacing, alignment, and sparse rules rather than card boxes.

### Capability constellation

Interactive node map with a linear accessible alternative.

## 4. Responsive behavior

- Preserve content priority, not desktop composition.
- Remove nonessential decorative layers below defined breakpoints.
- Use source order matching mobile reading order.
- Do not use CSS reordering that creates keyboard/visual mismatch.
- Prevent project titles from becoming illegible due to viewport-relative sizing.

## 5. Component API rules

- Prefer explicit variants over arbitrary style props.
- Do not pass localized raw objects deeply through the tree.
- Every interactive component requires keyboard behavior and visible focus.
- Every media component requires alt/caption handling.
- Every animated component must support reduced motion.
- Every external link must clearly expose its destination behavior.

## 6. Design token mapping

Tokens must cover:

- Color.
- Typography.
- Spacing.
- Grid.
- Motion duration/easing.
- Z-index layers.
- Focus style.
- Media aspect ratios.

Avoid scattered arbitrary values. A small number of deliberate one-off editorial offsets is acceptable when documented.

## 7. States

All interactive components need:

- Default.
- Hover where applicable.
- Focus-visible.
- Active/selected.
- Disabled where applicable.
- Loading where applicable.
- Error where applicable.

## 8. Anti-card review checklist

Before accepting a section, ask:

- Is the border necessary for meaning?
- Can hierarchy be expressed through spacing or typography?
- Are multiple components visually identical despite different content?
- Does rounded geometry communicate anything?
- Does the section resemble a dashboard template?

If the answer indicates decorative containment, redesign the section.

## 9. Story block renderer

Case-study blocks should map from JSON type to an allowlisted component:

```text
text → TextBlock
media → MediaBlock
decision → DecisionBlock
architecture → ArchitectureBlock
metric → MetricBlock
reflection → ReflectionBlock
```

Unknown block types must fail validation, not silently disappear.

---

# Motion and Interaction Specification

## 1. Motion objectives

Motion may communicate:

- Entry and hierarchy.
- Continuity between project index and project detail.
- Scroll progress.
- Relationship between capability and evidence.
- State change after filtering or locale switching.

Motion must not compensate for weak content or layout.

## 2. Motion levels

### Level 0 — essential state feedback

- Focus/press state.
- Menu open/close.
- Filter selection.
- Loading/success/error state.

Must remain understandable when animation is removed.

### Level 1 — editorial reveal

- Text line reveal.
- Media mask reveal.
- Section marker transition.

Use sparingly and once per meaningful section.

### Level 2 — narrative linkage

- Signal path progression.
- Shared project-media transition.
- Capability-to-project highlighting.

These are optional enhancements and should not block launch.

## 3. Duration guidance

- Micro interaction: roughly 100–200 ms.
- Navigation/state transition: roughly 180–350 ms.
- Editorial reveal: roughly 400–800 ms.
- Avoid long entrance sequences that delay reading.

Exact values must be tested, not copied mechanically.

## 4. Easing

Define named tokens:

- `--ease-out-interface`
- `--ease-in-out-layout`
- `--ease-editorial`

Do not use inconsistent custom cubic curves per component.

## 5. Scroll behavior

Allowed:

- Progress indicators.
- Low-amplitude parallax.
- In-view reveal.
- Sticky chapter labels.

Disallowed:

- Scroll hijacking.
- Mandatory horizontal scroll for primary reading.
- Large scroll-linked transforms that cause motion sickness.
- Animating layout properties continuously when transforms suffice.

## 6. Reduced motion

When reduced motion is requested:

- Remove parallax.
- Replace line/mask reveals with immediate visibility or short opacity change.
- Disable cursor-follow effects.
- Disable continuous signal movement.
- Preserve state transitions with minimal duration where necessary.
- Keep progress indicators functional without animated interpolation.

## 7. Custom cursor

A custom cursor is optional and desktop-only.

Requirements:

- Native cursor remains available for precision and accessibility.
- Do not obscure text selection.
- Disable for touch and coarse pointers.
- Do not use cursor labels as the only indication of action.

## 8. Project transition

Preferred concept:

1. Selected project image establishes a shared visual anchor.
2. Background field transitions to project theme.
3. Project title and stage remain readable throughout.
4. Route navigation completes without blocking browser history.

Fallback: immediate route transition with standard loading indicator.

## 9. Interaction performance

- Keep scroll handlers off the main thread where possible.
- Prefer transform and opacity.
- Avoid loading the motion library for pages/components that do not use it.
- Test mid-range mobile hardware, not only desktop.

## 10. Motion acceptance criteria

- No inaccessible content under reduced motion.
- No cumulative layout shift caused by animation initialization.
- Keyboard navigation is unaffected.
- Page remains readable before JavaScript hydration.
- Animation does not delay first interaction.

---

# Accessibility Specification

## 1. Target

Target WCAG 2.2 Level AA for the public website. Automated tools are necessary but insufficient; manual keyboard and screen-reader-oriented review is required.

## 2. Semantic structure

- One clear page-level `h1`.
- Logical heading sequence.
- Native landmarks: header, nav, main, footer.
- Lists and tables use semantic elements.
- Buttons perform actions; links navigate.
- Skip link is the first keyboard-focusable control.

## 3. Keyboard

- Every interactive element is reachable.
- Focus order follows visual/reading order.
- No keyboard trap.
- Escape closes overlays where expected.
- Visible focus must remain clear on all backgrounds.
- Work filters are operable without pointer input.

## 4. Contrast

- Standard text must satisfy AA contrast.
- Large text rules must not be used to justify low contrast for body copy.
- Focus indicators and meaningful graphic controls need sufficient contrast.
- Signal lime should be tested against both light and dark fields.

## 5. Motion

- Respect `prefers-reduced-motion`.
- Provide controls for persistent or auto-updating motion when applicable.
- Avoid flashing content.
- Do not use motion as the only state cue.

## 6. Images and media

- Informative images require localized alt text.
- Decorative images use empty alt.
- Complex diagrams require a text summary or equivalent structure.
- Videos require captions when speech is present.
- No audio autoplay.

## 7. Localization accessibility

- Set correct `lang` attribute per route.
- Do not mix locale strings silently.
- Locale switcher announces current and target language clearly.
- Preserve focus and page context after locale navigation.

## 8. Target size and responsive use

- Interactive targets must be comfortably usable on touch.
- Do not cluster small external-link icons without labels.
- Content must reflow at high zoom without two-dimensional scrolling, except genuinely two-dimensional artifacts.

## 9. Project diagrams

Architecture diagrams are a known risk. Each must include:

- Descriptive title.
- Concise textual explanation.
- Main nodes and relationship summary.
- Optional accessible data/table representation.

## 10. Forms

If a contact form is added:

- Visible labels.
- Programmatic error association.
- Clear required/optional status.
- Error summary for submission failures.
- No CAPTCHA that blocks users without an accessible alternative.

## 11. Test matrix

Manual:

- Keyboard-only navigation.
- 200% and 400% zoom spot checks.
- Reduced motion.
- High contrast/forced colors spot checks.
- Screen-reader smoke test for navigation and one project.

Automated:

- axe checks on main routes.
- Semantic lint rules.
- Color contrast checks where tooling supports them.

## 12. Release blocker examples

- Missing focus visibility.
- Unreachable menu or filter.
- Missing `lang`.
- Project hero text unreadable over media.
- Critical content hidden in hover.
- Reduced-motion preference ignored for major scroll effects.
- Missing alt text for meaningful evidence.

---

# SEO and Social Sharing

## 1. Objectives

- Make personal identity and professional territory discoverable.
- Ensure each flagship project can be shared independently.
- Prevent duplicate locale indexing problems.
- Produce accurate social cards from JSON metadata.

## 2. Metadata requirements

Every public route must define:

- Localized title.
- Localized description.
- Canonical URL.
- Alternate locale links.
- Open Graph title/description/image.
- Social card type.
- Robots policy.

## 3. Page title patterns

- Home: `Jin — Data-informed Systems & Products`
- Work: `Selected Work — Jin`
- Project: `[Project Name] Case Study — Jin`
- About: `About Jin — Information Systems, Data & Product`

Vietnamese equivalents should be editorially adapted.

## 4. Structured data

Consider:

- `Person` for the profile.
- `WebSite` for site identity.
- `CreativeWork` or appropriate project representation for case studies.
- `BreadcrumbList` on project pages.

Do not add unsupported job titles, awards, employers, or credentials.

## 5. Sitemap

Generate from published JSON content:

- Both locale variants.
- Last modified date where trustworthy.
- Exclude drafts/private projects.

## 6. Robots and private content

- Public routes: indexable by default.
- Preview/private case studies: noindex and access-controlled where needed.
- Do not rely on robots rules to protect confidential information.

## 7. Social images

Required:

- Default profile card.
- Project-specific card for each featured project.
- Locale-specific text where text is embedded.

Social card should include:

- Project name.
- Primary role or concise descriptor.
- Brand mark.
- Strong visual artifact.

Avoid placing essential detail near crop-sensitive edges.

## 8. Content quality

- Project title and summary must be unique.
- Avoid keyword stuffing across five target roles.
- Use natural terminology in project evidence.
- Link related projects where relevant.
- Provide meaningful anchor text.

## 9. Technical checks

- Correct status codes.
- No broken canonical paths.
- No duplicated titles across locales.
- Metadata renders without client JavaScript.
- Social image URLs are absolute and accessible.
- `lang` and alternate locale annotations align with routes.

---

# Analytics and Privacy

## 1. Analytics objective

Analytics should answer product questions, not collect data by default.

Primary questions:

- Which audience sources reach the site?
- Which role filters are used?
- Which projects create deeper engagement?
- Which conversion actions are selected?
- Does language affect navigation and conversion?

## 2. Event taxonomy

| Event | Key properties |
|---|---|
| `view_project` | project_id, locale, source_page |
| `filter_work` | role, domain, stage, result_count |
| `download_cv` | locale, cv_version |
| `open_repository` | project_id |
| `open_artifact` | project_id, artifact_type |
| `contact_action` | intent, channel, locale |
| `switch_locale` | from_locale, to_locale, route_type |
| `case_study_progress` | project_id, milestone |
| `reduced_motion_active` | boolean, no persistent fingerprinting |

## 3. Data minimization

Do not collect:

- Full query text from contact messages in analytics.
- Email addresses in analytics events.
- Fine-grained cursor recordings by default.
- Sensitive personal data.
- Keystroke or form-field replay.

## 4. Consent model

Select the least invasive provider and configuration that satisfies the questions above. If cookies or nonessential tracking are used, implement appropriate consent behavior for the intended audience and jurisdictions.

Do not show a decorative consent banner that does not actually control tracking.

## 5. Privacy page

Explain:

- What is collected.
- Why it is collected.
- Provider/processors.
- Retention approach.
- Contact route for privacy requests.
- Cookie status.

## 6. Measurement interpretation

Known limitations:

- Portfolio traffic is low-volume and noisy.
- A CV download is not equivalent to a shortlist.
- Scroll depth is not proof of comprehension.
- Referral sources may be obscured.
- Recruiters may browse with tracking protection.

Use analytics to identify friction, not to make causal claims without experiments.

## 7. Optional operational log

Maintain a monthly lightweight review:

- Top entry routes.
- Top project views.
- Broken links/errors.
- Conversion actions.
- Locale split.
- Content updates needed.

---

# Testing and Quality Assurance

## 1. Quality layers

### Static quality

- Formatting.
- Lint.
- Type checking.
- JSON Schema validation.
- Internal reference validation.
- Broken asset/link checks.

### Component quality

- Rendering.
- Interaction.
- Keyboard behavior.
- Localized variants.
- Reduced-motion variants.

### Route quality

- Static generation.
- Metadata.
- Navigation.
- Locale switching.
- Project filtering.
- Error states.

### Production quality

- Performance.
- Accessibility.
- Analytics.
- External links.
- Social cards.

## 2. Unit tests

Prioritize pure logic:

- Locale resolver.
- Project filters.
- Related-project scoring.
- Publication visibility.
- SEO metadata derivation.
- CV route selection.
- Evidence/status formatting.

## 3. Component tests

Required:

- Locale switcher.
- Work filter.
- Global/mobile navigation.
- Case-study progress.
- Story block renderer.
- External link and download link.
- Empty/error state.

## 4. E2E smoke suite

For both locales:

1. Load homepage.
2. Navigate to Work.
3. Filter by role.
4. Open project.
5. Verify project title, role, and stage.
6. Switch locale and remain on same project.
7. Open CV route.
8. Trigger contact action.
9. Verify 404 behavior.

## 5. Accessibility tests

- Automated axe scan on primary routes.
- Keyboard test for all navigation and filters.
- Focus management in mobile menu.
- Reduced-motion snapshot/behavior.
- Alt text presence for featured project media.

## 6. Visual regression

Capture stable states at:

- Mobile narrow.
- Mobile wide.
- Tablet.
- Desktop.
- Large desktop.

Cover:

- Both locales.
- Long Vietnamese project title.
- No-results filter state.
- Dark project theme.
- Reduced-motion mode if visual differences are material.

## 7. Content QA

- Names, dates, role attribution.
- Project stage.
- Personal contribution versus team contribution.
- Metric evidence state.
- Link availability.
- Vietnamese/English factual equivalence.
- No placeholder text in production.

## 8. Performance budgets

Initial budgets should be verified through measurement:

- Avoid shipping nonessential JavaScript to static content pages.
- Keep hero media appropriately sized.
- Lazy-load below-fold media.
- Prevent layout shift by reserving media dimensions.
- Avoid third-party scripts without a product justification.

Record actual route-level results in CI or release notes instead of asserting an unmeasured score.

## 9. Browser/device matrix

Minimum:

- Current stable Chromium.
- Current stable Firefox.
- Current stable Safari.
- iOS Safari recent versions.
- Android Chrome on a mid-range profile.

## 10. Release blockers

- Build/schema failure.
- Broken primary navigation.
- Missing required locale content.
- Critical/serious accessibility issue.
- Broken CV/contact action.
- Unreadable project hero.
- Material layout shift.
- Private or draft content exposed.

---

# Deployment and Operations

## 1. Environments

- Local development.
- Preview per pull request.
- Production.

Optional staging is unnecessary unless preview access is insufficient.

## 2. Branch strategy

Recommended:

- `main`: production-ready.
- Short-lived feature/content branches.
- Pull request required for code and major content changes.

Content-only changes still require validation and preview review.

## 3. CI gates

A pull request cannot merge unless:

- Dependencies install from lockfile.
- Lint passes.
- Type check passes.
- JSON schemas pass.
- Content references/assets pass.
- Tests pass.
- Production build succeeds.
- Preview route smoke test succeeds.

## 4. Deployment mode decision

Two valid modes:

### Platform-rendered deployment

Use when locale routing, image optimization, server form handling, or framework runtime features are valuable.

### Static export

Use when all required routes and assets can be produced at build time and deployment portability is prioritized.

Complete a technical spike before locking this decision.

## 5. Domain and redirects

- Use a short personal domain.
- Redirect alternate hostnames to one canonical origin.
- Enforce HTTPS.
- Preserve old project URLs through redirects after slug changes.

## 6. Content publishing workflow

1. Add/update JSON.
2. Run local schema/content validation.
3. Add/optimize assets.
4. Preview both locales.
5. Review claims and links.
6. Open pull request.
7. Approve preview.
8. Merge and deploy.
9. Verify production route and metadata.

## 7. CV publishing

- Version filename or metadata.
- Keep one stable public download route.
- Update `updatedAt` in profile JSON.
- Verify both locale links.
- Prevent outdated copies from being surfaced by internal links.

## 8. Rollback

- Deployment platform rollback to previous successful build.
- Content changes remain versioned in Git.
- Avoid destructive runtime migrations in version 1.

## 9. Monitoring

Monitor:

- Build failures.
- Runtime errors.
- 404s.
- Broken external links.
- Performance regressions.
- Contact route failures if a form exists.

## 10. Maintenance cadence

Monthly:

- Verify CV and availability.
- Check external links.
- Review analytics and top routes.
- Remove stale “current” claims.

Quarterly:

- Review dependencies/security advisories.
- Re-run accessibility manual checks.
- Review featured work relevance.
- Update project evidence and outcomes.

---

# Implementation Roadmap

## Phase 0 — Content and decision lock

### Outputs

- Final default locale decision.
- Domain decision.
- Initial four flagship projects.
- Project stage and role attribution.
- CV source files.
- Contact channels.
- Asset inventory.

### Exit criteria

- No open P0 decision.
- Four projects pass minimum content requirements.

## Phase 1 — Foundation

### Tasks

- Initialize Next.js TypeScript project.
- Configure lint, formatting, testing, and CI.
- Implement locale routing.
- Define tokens and global CSS.
- Add JSON schemas and validators.
- Create content selectors and types.
- Build semantic global layout/navigation/footer.

### Exit criteria

- Both locale home shells render.
- Invalid JSON fails the build.
- Keyboard navigation works.

## Phase 2 — Core content routes

### Tasks

- Homepage static sections.
- Work index and filters.
- Project detail route.
- Story block renderer.
- About, contact, CV, privacy, 404.
- SEO metadata and sitemap.

### Exit criteria

- All routes function without advanced motion.
- Four project pages are complete in both locales.

## Phase 3 — Brand expression

### Tasks

- Hero typography and signal system.
- Full-bleed project chapters.
- Capability constellation plus accessible alternative.
- Project-specific visual themes.
- Responsive editorial layout polish.

### Exit criteria

- Brand is recognizable without relying on animation.
- Mobile layout is not a collapsed desktop approximation.

## Phase 4 — Motion and interaction

### Tasks

- Editorial reveals.
- Work filtering transitions.
- Chapter progress.
- Optional shared transitions.
- Reduced-motion implementation.
- Motion performance test.

### Exit criteria

- All content works with motion disabled.
- No major layout shift or interaction delay.

## Phase 5 — Quality and launch

### Tasks

- Content review.
- Accessibility audit.
- Browser/device QA.
- Performance audit.
- Social card generation.
- Analytics/privacy configuration.
- Domain and redirects.
- Production verification.

### Exit criteria

- Definition of Done is satisfied.
- No release blocker remains.

## Suggested backlog priorities

### P0

- Content schemas.
- Locale routing.
- Homepage/work/project/about/contact/CV.
- Four complete projects.
- Accessibility and responsive baseline.
- SEO metadata.

### P1

- Role/domain filters.
- Signal-flow visuals.
- Project progress navigation.
- Analytics.
- Social images.

### P2

- Shared page transitions.
- Interactive constellation.
- Notes/articles.
- Private case studies.
- Contact form.

## Implementation risk register

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Scope expands into five separate portfolios | High | High | Maintain one umbrella positioning and role lenses |
| Content is not ready when code is ready | High | High | Treat content completion as Phase 0 dependency |
| Motion delays launch | Medium | High | Build full static experience first |
| JSON becomes an ad hoc CMS | Medium | Medium | Enforce schemas and structured blocks |
| Bilingual copy diverges | Medium | High | Factual-equivalence review gate |
| Site looks creative but evidence is weak | Medium | High | Evidence minimum for featured projects |
| Media harms performance | High | Medium | Asset metadata, responsive optimization, budgets |

---

# Definition of Done

## 1. Product

- [ ] The homepage communicates identity, professional territory, and next action in the first viewport.
- [ ] Recruiter, freelance, and partner paths are supported.
- [ ] Five target role lenses map to evidence without fragmenting the brand.
- [ ] At least four flagship projects are published.
- [ ] Project stage and personal contribution are explicit.

## 2. Content

- [ ] Required content exists in English and Vietnamese.
- [ ] Claims are accurate and evidence status is correct.
- [ ] Team contribution is not represented as individual contribution.
- [ ] No placeholder or unreviewed draft is public.
- [ ] CV files and update dates are current.

## 3. Data

- [ ] All JSON validates against schemas.
- [ ] IDs and slugs are unique.
- [ ] Internal asset/artifact references resolve.
- [ ] Featured projects meet minimum required fields.
- [ ] Draft/private content is excluded from public generation.

## 4. UX/UI

- [ ] No section depends on repetitive bordered cards as its primary composition.
- [ ] Layout works at mobile, tablet, desktop, and large desktop.
- [ ] Work index remains rapidly scannable.
- [ ] Locale switch preserves page context.
- [ ] Filters preserve understandable state.
- [ ] Error and empty states are complete.

## 5. Accessibility

- [ ] Keyboard navigation is complete.
- [ ] Focus is visible.
- [ ] Heading and landmark structure is valid.
- [ ] Informative images have localized alt text.
- [ ] Reduced-motion behavior is implemented.
- [ ] Automated audit has no critical/serious issues.
- [ ] Manual accessibility smoke test is complete.

## 6. Engineering

- [ ] Lint passes.
- [ ] Type check passes.
- [ ] Tests pass.
- [ ] Production build passes.
- [ ] Core content renders before client interaction code.
- [ ] No secret is exposed to the client.
- [ ] Dependencies are locked.

## 7. SEO and sharing

- [ ] Metadata is localized.
- [ ] Canonical and alternate locale URLs are correct.
- [ ] Sitemap contains all published routes.
- [ ] Social cards are available.
- [ ] 404/private routes have correct indexing behavior.

## 8. Operations

- [ ] Preview workflow is verified.
- [ ] Production rollback is understood.
- [ ] Domain and HTTPS are correct.
- [ ] Analytics behavior matches privacy disclosure.
- [ ] Contact and CV links are verified in production.

---

# Technical References

The implementation should verify current stable versions at project initialization. These references define the architectural capabilities used by this specification.

## Framework and rendering

- Next.js App Router documentation: https://nextjs.org/docs/app
- Next.js static export guide: https://nextjs.org/docs/app/guides/static-exports

## Internationalization

- next-intl App Router guide: https://next-intl.dev/docs/getting-started/app-router
- next-intl routing configuration: https://next-intl.dev/docs/routing/configuration
- next-intl metadata and route handlers: https://next-intl.dev/docs/environments/actions-metadata-route-handlers

## Styling and tokens

- Tailwind CSS theme variables: https://tailwindcss.com/docs/theme
- Tailwind CSS custom colors: https://tailwindcss.com/docs/customizing-colors
- Tailwind CSS font families: https://tailwindcss.com/docs/font-family

## Motion

- Motion for React: https://motion.dev/docs/react
- React scroll animations: https://motion.dev/docs/react-scroll-animations
- `useScroll`: https://motion.dev/docs/react-use-scroll
- `useInView`: https://motion.dev/docs/react-use-in-view

## Accessibility

- WCAG 2.2 Quick Reference: https://www.w3.org/WAI/WCAG22/quickref/
- WCAG reduced-motion technique: https://www.w3.org/WAI/WCAG22/Techniques/css/C39
- WCAG text contrast technique: https://www.w3.org/WAI/WCAG22/Techniques/general/G18
- Pause, Stop, Hide guidance: https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html

## Content validation

- JSON Schema Draft 2020-12: https://json-schema.org/draft/2020-12

## Reference policy

- Prefer official framework/library documentation.
- Pin stable compatible package versions through the lockfile.
- Record material architecture changes in `DECISIONS.md`.
- Re-check browser support before adopting experimental page-transition features.

---

# Architecture and Product Decision Log

Use this file for decisions that materially change implementation or content behavior.

## Decision template

```text
ID:
Date:
Status: proposed | accepted | superseded
Decision:
Context:
Options considered:
Rationale:
Consequences:
Owner:
```

---

## ADR-001 — Umbrella positioning

**Status:** Accepted  
**Decision:** Use “Data-informed systems and products” as the master positioning. Treat DA, DS, BA, SA, and Product as evidence lenses rather than separate identities.

**Rationale:** Five equal role identities would weaken recognition and create contradictory navigation/content.

**Consequences:** Every featured project must declare one primary role and no more than two secondary roles.

---

## ADR-002 — Bilingual routing

**Status:** Accepted  
**Decision:** Use locale-prefixed routes for English and Vietnamese.

**Rationale:** Predictable URLs, explicit language state, and independent metadata.

**Consequences:** Every required route and featured project must be complete in both locales.

---

## ADR-003 — Default locale

**Status:** Proposed  
**Decision:** Use English as the default public locale.

**Rationale:** Broader recruiter and external-partner reach.

**Open issue:** Confirm whether root `/` redirects to `/en` unconditionally or uses a locale negotiation strategy.

---

## ADR-004 — Content source

**Status:** Accepted  
**Decision:** Use version-controlled JSON as the source of truth, validated at build time.

**Rationale:** The user requires rendering from a JSON data repository and version 1 does not require a runtime CMS/database.

**Consequences:** Content changes use pull requests and previews; arbitrary rich HTML is not accepted.

---

## ADR-005 — Static-first experience

**Status:** Accepted  
**Decision:** Build the complete semantic and responsive experience before advanced motion.

**Rationale:** Prevent motion scope from blocking launch and protect accessibility/performance.

---

## ADR-006 — Deployment mode

**Status:** Proposed  
**Decision:** Choose between platform rendering and static export after a technical spike covering locale routing, image behavior, metadata, and future contact form requirements.
