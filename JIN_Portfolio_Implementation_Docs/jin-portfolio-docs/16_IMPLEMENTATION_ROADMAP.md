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
