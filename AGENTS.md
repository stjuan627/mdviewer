## Architecture Guardrails

- Default product language is English. Unless a task explicitly targets localization or translation, user-facing UI copy, tooltips, labels, empty states, and product text should be written in English by default.
- Keep a single render pipeline: preview, copied HTML, and share pages must all be derived from `renderResult(markdown)`. Do not introduce separate HTML wrappers or alternate rendering shells for preview/share.
- Treat in-session navigation and share persistence as separate mechanisms. Long markdown handoff from `/markdown-viewer` to `/workbench` must use `workbench-navigation-store`, not URL query payloads. Share revisit must use `shareId` plus server hydration.
- Preserve the `draftMarkdown` -> `commitDraftMarkdown()` -> `$markdown` flow. Do not write editor keystrokes directly into the committed render state unless the rendering strategy is intentionally redesigned.
- Normalize and validate all markdown inputs at boundaries. Reuse `normalizeMarkdown()` and Zod schemas in `src/lib/schemas.ts`; do not duplicate ad hoc trimming or validation logic in multiple components or routes.
- Share records must be rendered server-side from markdown. Do not trust or persist client-provided HTML as the canonical shared output.
- Keep Astro pages thin and React components interactive. Route and layout concerns belong in `.astro`; editor, workbench state, and rich UI logic belong in React components.
- Any change to share record fields or rendering contracts must be updated consistently across D1 migrations, `src/lib/share.ts`, API routes, page rendering, and tests.
- The database `view` field is currently a legacy storage detail, not an active frontend mode switch. Do not reintroduce article/release mode branching unless explicitly redesigning the product.
- For any UI, CSS, or frontend component change, read and follow `DESIGN.md` first.
