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
