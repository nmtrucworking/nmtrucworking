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
