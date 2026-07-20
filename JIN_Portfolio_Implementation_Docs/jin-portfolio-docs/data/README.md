# Data Repository Guide

## 1. Files

- `examples/site.json`: site-wide configuration.
- `examples/profile.json`: identity, capabilities, timeline, contact and CV.
- `examples/projects.json`: project records and case-study blocks.
- `examples/messages.en.json`: English UI labels.
- `examples/messages.vi.json`: Vietnamese UI labels.
- `schemas/*.schema.json`: JSON Schema validation definitions.

## 2. Validation

Recommended development scripts:

```text
content:validate      Validate schemas
content:references    Validate IDs, slugs, assets and links
content:locales       Ensure required localized fields
content:all           Run all content checks
```

Use a JSON Schema Draft 2020-12 compatible validator.

## 3. Editing rules

- Never change an existing project `id` after publication.
- Avoid changing `slug`; add redirects if changed.
- Add both English and Vietnamese values for required localized fields.
- Mark drafts as `draft`; they must not be generated publicly.
- Store project stage and evidence status truthfully.
- Add image dimensions and localized alt text.

## 4. File-size strategy

When project case studies become large, split `projects.json` into:

```text
projects/
├── index.json
├── senova.json
├── operations-hub.json
└── recobridge.json
```

The loader may aggregate them into one typed collection. Do not split prematurely if maintenance remains simple.
