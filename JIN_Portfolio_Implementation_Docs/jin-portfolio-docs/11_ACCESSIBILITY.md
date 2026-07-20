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
