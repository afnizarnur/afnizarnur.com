---
trigger: model_decision
description: 
globs: 
---
# SEO and Performance Guidelines

## SEO Requirements
- Use proper meta tags in `<head>` for all pages
- Implement canonical URLs
- Use the `<SEO>` component pattern for consistent meta information
- Ensure proper semantic HTML structure
- Implement proper ARIA attributes for accessibility

## Performance Requirements
Focus on Core Web Vitals:
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)

Implementation:
- Use static generation whenever possible
- Implement proper lazy loading
- Optimize images using Astro's Image component
- Minimize client-side JavaScript
- Use partial hydration with client:* directives strategically

## Monitoring
- Use Lighthouse for performance auditing
- Implement WebPageTest for detailed analysis
- Monitor Core Web Vitals in production
- Set and maintain performance budgets
