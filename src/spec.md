# Specification

## Summary
**Goal:** Lower the two primary CTA buttons in the Home page hero so they sit further down within the hero area on mobile and desktop, without changing any existing hero content or behavior.

**Planned changes:**
- Adjust layout spacing in `frontend/src/pages/HomePage.tsx` to increase vertical space above the hero CTA button row (“Open AI App Builder” and “Browse Opportunities”) on both mobile and desktop breakpoints.
- Preserve existing hero text order, readability overlays/gradients, and responsive behavior; do not modify the sticky header component.

**User-visible outcome:** On the Home/Landing page, the “Open AI App Builder” and “Browse Opportunities” buttons appear noticeably lower in the hero section while everything else looks and behaves the same, and both buttons still navigate to `/builder` and `/browse`.
