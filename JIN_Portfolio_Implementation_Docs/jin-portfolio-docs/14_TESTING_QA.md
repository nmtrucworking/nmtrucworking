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
