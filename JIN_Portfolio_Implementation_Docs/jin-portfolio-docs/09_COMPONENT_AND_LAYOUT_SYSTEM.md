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
