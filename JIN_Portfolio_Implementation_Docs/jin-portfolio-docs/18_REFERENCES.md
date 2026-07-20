# Technical References

The implementation should verify current stable versions at project initialization. These references define the architectural capabilities used by this specification.

## Framework and rendering

- Next.js App Router documentation: https://nextjs.org/docs/app
- Next.js static export guide: https://nextjs.org/docs/app/guides/static-exports

## Internationalization

- next-intl App Router guide: https://next-intl.dev/docs/getting-started/app-router
- next-intl routing configuration: https://next-intl.dev/docs/routing/configuration
- next-intl metadata and route handlers: https://next-intl.dev/docs/environments/actions-metadata-route-handlers

## Styling and tokens

- Tailwind CSS theme variables: https://tailwindcss.com/docs/theme
- Tailwind CSS custom colors: https://tailwindcss.com/docs/customizing-colors
- Tailwind CSS font families: https://tailwindcss.com/docs/font-family

## Motion

- Motion for React: https://motion.dev/docs/react
- React scroll animations: https://motion.dev/docs/react-scroll-animations
- `useScroll`: https://motion.dev/docs/react-use-scroll
- `useInView`: https://motion.dev/docs/react-use-in-view

## Accessibility

- WCAG 2.2 Quick Reference: https://www.w3.org/WAI/WCAG22/quickref/
- WCAG reduced-motion technique: https://www.w3.org/WAI/WCAG22/Techniques/css/C39
- WCAG text contrast technique: https://www.w3.org/WAI/WCAG22/Techniques/general/G18
- Pause, Stop, Hide guidance: https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html

## Content validation

- JSON Schema Draft 2020-12: https://json-schema.org/draft/2020-12

## Reference policy

- Prefer official framework/library documentation.
- Pin stable compatible package versions through the lockfile.
- Record material architecture changes in `DECISIONS.md`.
- Re-check browser support before adopting experimental page-transition features.
