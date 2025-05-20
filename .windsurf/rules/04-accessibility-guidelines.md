---
trigger: always_on
description: 
globs: 
---
# Accessibility Guidelines

This project aims to follow WCAG 2.1 AA standards for accessibility. Use these guidelines to ensure accessibility compliance.

## Color and Contrast

- Ensure text has sufficient contrast ratio against its background:
  - Normal text: minimum 4.5:1 contrast ratio
  - Large text (18pt+): minimum 3:1 contrast ratio
  - UI components and graphical objects: minimum 3:1 contrast ratio
- Do not rely solely on color to convey information
- Verify all theme variants (light, dark, gray, pink, blue) meet contrast requirements
- In color themes like pink and blue, pay special attention to text contrast

## Component Accessibility

### Buttons and Interactive Elements

- Always include accessible names for interactive elements:
  ```astro
  <button aria-label="Close dialog">×</button>
  ```
- Include focus styles for all interactive elements:
  ```css
  button:focus-visible {
    outline: 2px solid var(--border-default);
    outline-offset: 2px;
  }
  ```
- Use appropriate semantic HTML elements whenever possible
- Ensure all interactive elements can be operated with keyboard alone

### Images and Media

- Always include descriptive `alt` attributes for images:
  ```astro
  <img src="/avatar.png" alt="Afnizar Nur Ghifari profile picture" />
  ```
- Use empty alt attributes for decorative images:
  ```astro
  <img src="/decorative-pattern.png" alt="" role="presentation" />
  ```
- Provide captions or transcripts for video/audio content

### Forms and Inputs

- Associate labels with form inputs using `for` attribute:
  ```astro
  <label for="name">Name</label>
  <input id="name" type="text" />
  ```
- Provide clear error messages that identify the field with error
- Group related form elements with `fieldset` and `legend`
- Ensure form controls have accessible names

## Responsive and Mobile Accessibility

- Ensure content is readable at 200% zoom
- Design layouts that adapt to portrait/landscape orientations
- Ensure touch targets are at least 44×44 pixels
- Implement proper viewport settings:
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  ```

## ARIA Usage

- Use ARIA attributes only when necessary
- Use appropriate landmark roles to structure content:
  ```astro
  <header role="banner">...</header>
  <main role="main">...</main>
  <nav role="navigation">...</nav>
  <footer role="contentinfo">...</footer>
  ```
- Follow ARIA best practices for custom widgets:
  - Ensure proper keyboard interaction
  - Manage focus appropriately
  - Convey state changes to assistive technology

## Keyboard Navigation

- Ensure all functionality is available using keyboard only
- Implement logical focus order that follows visual layout
- Make focus visible with clear focus indicators
- Allow keyboard users to skip repeated content with skip links:
  ```astro
  <a href="#main-content" class="skip-link">Skip to main content</a>
  ```

## Testing and Validation

- Test with screen readers (NVDA, VoiceOver, JAWS)
- Validate with automated tools like axe, Lighthouse, or WAVE
- Perform keyboard-only navigation tests
- Test at various zoom levels (up to 400%)
- Test with different theme variations
