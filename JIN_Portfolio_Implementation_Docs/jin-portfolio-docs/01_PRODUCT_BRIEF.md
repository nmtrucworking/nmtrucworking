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
