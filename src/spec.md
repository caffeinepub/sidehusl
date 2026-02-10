# Specification

## Summary
**Goal:** Move the landing page hero supporting paragraph to the very top of the hero content while keeping readability and the existing hero visuals intact.

**Planned changes:**
- In `frontend/src/pages/HomePage.tsx`, reorder the hero content so the supporting paragraph beginning with “Create your own AI-powered web app in minutes. No coding required.” is the first text shown (above the “AI-Powered App Builder” label and CTA buttons).
- Adjust hero layout spacing/alignment (padding/margins/vertical alignment) so the paragraph sits as high as practical within the hero area on mobile and desktop while remaining readable and visually balanced.
- Preserve existing hero overlay/gradients and ensure the paragraph remains readable over the background image in both light and dark themes, without changing any copy or CTA behavior.

**User-visible outcome:** On the home page, users see the supporting hero paragraph at the top of the hero section before the label and buttons, with a well-balanced layout across screen sizes.
