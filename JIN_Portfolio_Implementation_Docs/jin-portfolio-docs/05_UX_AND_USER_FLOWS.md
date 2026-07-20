# UX and User Flows

## 1. UX objectives

- Communicate identity quickly.
- Support both exploration and rapid scanning.
- Expose evidence at the point of each claim.
- Preserve orientation during creative transitions.
- Make language switching predictable.

## 2. Primary flow — recruiter

```text
Entry from CV/search/referral
→ Understand role territory in hero
→ Open Work or select role lens
→ Scan project index
→ Open relevant case study
→ Verify role, decisions, outputs, evidence
→ Download CV / contact
```

### Acceptance criteria

- CV is reachable from every primary page.
- Primary role and personal contribution appear above the first major project fold.
- Project stage is visible before impact claims.
- Recruiter can disable or bypass elaborate motion.

## 3. Primary flow — freelance client

```text
Entry from social/referral
→ Understand problem domains
→ Review capability-to-deliverable mapping
→ Open relevant project
→ Review process, limitations and outputs
→ Select project inquiry contact action
```

### Acceptance criteria

- Services are expressed as outcomes/deliverables, not only job titles.
- Contact action carries an intent parameter or prefilled subject where supported.
- No price or delivery promise is shown unless intentionally maintained.

## 4. Primary flow — project partner

```text
Entry from shared project link
→ Review current focus
→ Inspect system/process evidence
→ Understand collaboration role
→ Open repository/artifact
→ Initiate collaboration contact
```

### Acceptance criteria

- External artifacts open with clear labels.
- Private/unavailable repositories are not shown as broken links.
- Collaboration expectations are explicit.

## 5. Locale switching flow

```text
Current localized route
→ Select locale
→ Resolve same content entity in target locale
→ Preserve page and project slug
→ Update metadata and document language
```

Fallback policy:

- Required public content must exist in both locales.
- Missing optional long-form content may show a clearly labeled fallback only during development.
- Production must not silently mix Vietnamese and English within a content section.

## 6. Work filtering flow

```text
Open Work
→ Select one or more filters
→ Results update
→ URL/query state updates
→ Open project
→ Back returns to preserved filter state
```

### Rules

- Filter buttons must expose selected state programmatically.
- Empty results provide clear-reset action.
- Role filters are evidence lenses, not claims that every project represents every role.

## 7. Case-study reading modes

### Scan mode

For visitors with limited time:

- Summary.
- Role.
- Challenge.
- Key decision.
- Output.
- Validation.

### Deep mode

For technical or project evaluation:

- Architecture.
- Data/model details.
- Requirements/business rules.
- Trade-offs.
- Limitations.
- Artifacts.

Use chapter navigation and progressive disclosure rather than hiding essential content in hover-only interactions.

## 8. Interaction constraints

- No essential information only on hover.
- No scroll hijacking.
- No horizontal scroll requirement for core content on mobile.
- Cursor replacement must not remove native pointer semantics.
- Parallax amplitude should remain low and be removed under reduced-motion preferences.
- Auto-advancing media requires pause/control.

## 9. UX content states

Every project must clearly label one stage:

- `production`
- `prototype`
- `concept`
- `academic`
- `archived`

Every impact item must label one evidence state:

- `measured`
- `validated`
- `observed`
- `expected`
- `not-yet-evaluated`

## 10. Conversion events

- `view_project`
- `filter_work`
- `download_cv`
- `open_repository`
- `open_artifact`
- `contact_email`
- `contact_linkedin`
- `switch_locale`
- `case_study_50`
- `case_study_90`

Do not interpret clicks as successful hiring or collaboration outcomes without downstream evidence.
