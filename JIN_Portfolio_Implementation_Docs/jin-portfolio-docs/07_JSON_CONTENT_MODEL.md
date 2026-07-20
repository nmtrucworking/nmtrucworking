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
