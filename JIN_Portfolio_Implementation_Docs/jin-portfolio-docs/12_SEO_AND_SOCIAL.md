# SEO and Social Sharing

## 1. Objectives

- Make personal identity and professional territory discoverable.
- Ensure each flagship project can be shared independently.
- Prevent duplicate locale indexing problems.
- Produce accurate social cards from JSON metadata.

## 2. Metadata requirements

Every public route must define:

- Localized title.
- Localized description.
- Canonical URL.
- Alternate locale links.
- Open Graph title/description/image.
- Social card type.
- Robots policy.

## 3. Page title patterns

- Home: `Jin — Data-informed Systems & Products`
- Work: `Selected Work — Jin`
- Project: `[Project Name] Case Study — Jin`
- About: `About Jin — Information Systems, Data & Product`

Vietnamese equivalents should be editorially adapted.

## 4. Structured data

Consider:

- `Person` for the profile.
- `WebSite` for site identity.
- `CreativeWork` or appropriate project representation for case studies.
- `BreadcrumbList` on project pages.

Do not add unsupported job titles, awards, employers, or credentials.

## 5. Sitemap

Generate from published JSON content:

- Both locale variants.
- Last modified date where trustworthy.
- Exclude drafts/private projects.

## 6. Robots and private content

- Public routes: indexable by default.
- Preview/private case studies: noindex and access-controlled where needed.
- Do not rely on robots rules to protect confidential information.

## 7. Social images

Required:

- Default profile card.
- Project-specific card for each featured project.
- Locale-specific text where text is embedded.

Social card should include:

- Project name.
- Primary role or concise descriptor.
- Brand mark.
- Strong visual artifact.

Avoid placing essential detail near crop-sensitive edges.

## 8. Content quality

- Project title and summary must be unique.
- Avoid keyword stuffing across five target roles.
- Use natural terminology in project evidence.
- Link related projects where relevant.
- Provide meaningful anchor text.

## 9. Technical checks

- Correct status codes.
- No broken canonical paths.
- No duplicated titles across locales.
- Metadata renders without client JavaScript.
- Social image URLs are absolute and accessible.
- `lang` and alternate locale annotations align with routes.
