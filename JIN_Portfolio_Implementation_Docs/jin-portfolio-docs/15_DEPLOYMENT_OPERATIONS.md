# Deployment and Operations

## 1. Environments

- Local development.
- Preview per pull request.
- Production.

Optional staging is unnecessary unless preview access is insufficient.

## 2. Branch strategy

Recommended:

- `main`: production-ready.
- Short-lived feature/content branches.
- Pull request required for code and major content changes.

Content-only changes still require validation and preview review.

## 3. CI gates

A pull request cannot merge unless:

- Dependencies install from lockfile.
- Lint passes.
- Type check passes.
- JSON schemas pass.
- Content references/assets pass.
- Tests pass.
- Production build succeeds.
- Preview route smoke test succeeds.

## 4. Deployment mode decision

Two valid modes:

### Platform-rendered deployment

Use when locale routing, image optimization, server form handling, or framework runtime features are valuable.

### Static export

Use when all required routes and assets can be produced at build time and deployment portability is prioritized.

Complete a technical spike before locking this decision.

## 5. Domain and redirects

- Use a short personal domain.
- Redirect alternate hostnames to one canonical origin.
- Enforce HTTPS.
- Preserve old project URLs through redirects after slug changes.

## 6. Content publishing workflow

1. Add/update JSON.
2. Run local schema/content validation.
3. Add/optimize assets.
4. Preview both locales.
5. Review claims and links.
6. Open pull request.
7. Approve preview.
8. Merge and deploy.
9. Verify production route and metadata.

## 7. CV publishing

- Version filename or metadata.
- Keep one stable public download route.
- Update `updatedAt` in profile JSON.
- Verify both locale links.
- Prevent outdated copies from being surfaced by internal links.

## 8. Rollback

- Deployment platform rollback to previous successful build.
- Content changes remain versioned in Git.
- Avoid destructive runtime migrations in version 1.

## 9. Monitoring

Monitor:

- Build failures.
- Runtime errors.
- 404s.
- Broken external links.
- Performance regressions.
- Contact route failures if a form exists.

## 10. Maintenance cadence

Monthly:

- Verify CV and availability.
- Check external links.
- Review analytics and top routes.
- Remove stale “current” claims.

Quarterly:

- Review dependencies/security advisories.
- Re-run accessibility manual checks.
- Review featured work relevance.
- Update project evidence and outcomes.
