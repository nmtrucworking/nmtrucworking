# Architecture and Product Decision Log

Use this file for decisions that materially change implementation or content behavior.

## Decision template

```text
ID:
Date:
Status: proposed | accepted | superseded
Decision:
Context:
Options considered:
Rationale:
Consequences:
Owner:
```

---

## ADR-001 — Umbrella positioning

**Status:** Accepted  
**Decision:** Use “Data-informed systems and products” as the master positioning. Treat DA, DS, BA, SA, and Product as evidence lenses rather than separate identities.

**Rationale:** Five equal role identities would weaken recognition and create contradictory navigation/content.

**Consequences:** Every featured project must declare one primary role and no more than two secondary roles.

---

## ADR-002 — Bilingual routing

**Status:** Accepted  
**Decision:** Use locale-prefixed routes for English and Vietnamese.

**Rationale:** Predictable URLs, explicit language state, and independent metadata.

**Consequences:** Every required route and featured project must be complete in both locales.

---

## ADR-003 — Default locale

**Status:** Proposed  
**Decision:** Use English as the default public locale.

**Rationale:** Broader recruiter and external-partner reach.

**Open issue:** Confirm whether root `/` redirects to `/en` unconditionally or uses a locale negotiation strategy.

---

## ADR-004 — Content source

**Status:** Accepted  
**Decision:** Use version-controlled JSON as the source of truth, validated at build time.

**Rationale:** The user requires rendering from a JSON data repository and version 1 does not require a runtime CMS/database.

**Consequences:** Content changes use pull requests and previews; arbitrary rich HTML is not accepted.

---

## ADR-005 — Static-first experience

**Status:** Accepted  
**Decision:** Build the complete semantic and responsive experience before advanced motion.

**Rationale:** Prevent motion scope from blocking launch and protect accessibility/performance.

---

## ADR-006 — Deployment mode

**Status:** Proposed  
**Decision:** Choose between platform rendering and static export after a technical spike covering locale routing, image behavior, metadata, and future contact form requirements.
