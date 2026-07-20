# Analytics and Privacy

## 1. Analytics objective

Analytics should answer product questions, not collect data by default.

Primary questions:

- Which audience sources reach the site?
- Which role filters are used?
- Which projects create deeper engagement?
- Which conversion actions are selected?
- Does language affect navigation and conversion?

## 2. Event taxonomy

| Event | Key properties |
|---|---|
| `view_project` | project_id, locale, source_page |
| `filter_work` | role, domain, stage, result_count |
| `download_cv` | locale, cv_version |
| `open_repository` | project_id |
| `open_artifact` | project_id, artifact_type |
| `contact_action` | intent, channel, locale |
| `switch_locale` | from_locale, to_locale, route_type |
| `case_study_progress` | project_id, milestone |
| `reduced_motion_active` | boolean, no persistent fingerprinting |

## 3. Data minimization

Do not collect:

- Full query text from contact messages in analytics.
- Email addresses in analytics events.
- Fine-grained cursor recordings by default.
- Sensitive personal data.
- Keystroke or form-field replay.

## 4. Consent model

Select the least invasive provider and configuration that satisfies the questions above. If cookies or nonessential tracking are used, implement appropriate consent behavior for the intended audience and jurisdictions.

Do not show a decorative consent banner that does not actually control tracking.

## 5. Privacy page

Explain:

- What is collected.
- Why it is collected.
- Provider/processors.
- Retention approach.
- Contact route for privacy requests.
- Cookie status.

## 6. Measurement interpretation

Known limitations:

- Portfolio traffic is low-volume and noisy.
- A CV download is not equivalent to a shortlist.
- Scroll depth is not proof of comprehension.
- Referral sources may be obscured.
- Recruiters may browse with tracking protection.

Use analytics to identify friction, not to make causal claims without experiments.

## 7. Optional operational log

Maintain a monthly lightweight review:

- Top entry routes.
- Top project views.
- Broken links/errors.
- Conversion actions.
- Locale split.
- Content updates needed.
