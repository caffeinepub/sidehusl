# Specification

## Summary
**Goal:** Remove the Home page hero headline text block (“SIDEHUSL AI, BUILD YOUR SIDE HUSTLE TODAY!”) while keeping the rest of the hero content intact and visually balanced.

**Planned changes:**
- Update `frontend/src/pages/HomePage.tsx` to stop rendering the hero headline block containing “SIDEHUSL AI, BUILD YOUR SIDE HUSTLE TODAY!”.
- Adjust hero section spacing/layout as needed to avoid awkward gaps while keeping the “AI-Powered App Builder” label, supporting paragraph, and both CTA buttons unchanged.

**User-visible outcome:** The Home page hero no longer shows the “SIDEHUSL AI, BUILD YOUR SIDE HUSTLE TODAY!” headline, and the remaining hero label, paragraph, and CTA buttons appear normally without extra empty spacing.
