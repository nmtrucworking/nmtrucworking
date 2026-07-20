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
