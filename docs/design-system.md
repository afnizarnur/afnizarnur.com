# Design System Documentation

This document describes the design system used across afnizarnur.com, including design tokens, components, styling patterns, and usage guidelines.

## Table of Contents

- [Overview](#overview)
- [Design Tokens](#design-tokens)
- [Color System](#color-system)
- [Typography](#typography)
- [Spacing](#spacing)
- [Components](#components)
- [Styling with Tailwind](#styling-with-tailwind)
- [Responsive Design](#responsive-design)
- [Accessibility](#accessibility)

## Overview

The design system is built on **design tokens** managed by [Terrazzo](https://terrazzo.app/), which generates CSS variables and integrates with Tailwind CSS v4.

### Architecture

```
packages/tokens/
├── src/
│   └── tokens.tokens.json    # Token definitions (source of truth)
├── dist/
│   └── tokens.css            # Generated CSS variables
├── terrazzo.config.js        # Terrazzo configuration
└── package.json

↓ Consumed by ↓

apps/web/postcss.config.cjs   # PostCSS configuration (Tailwind v4)
apps/web/src/styles/global.css # Tailwind v4 theme configuration
apps/web/                     # Web application
```

### Key Principles

1. **Consistency** - Use tokens, not hardcoded values
2. **Scalability** - Easy to update and maintain
3. **Accessibility** - WCAG 2.1 AA compliant
4. **Performance** - Minimal CSS, utility-first approach
5. **Maintainability** - Single source of truth

## Design Tokens

Design tokens are the atomic building blocks of the design system. They define colors, spacing, typography, and other design decisions.

### Token Format

Tokens follow the [W3C Design Tokens Community Group specification](https://design-tokens.github.io/community-group/format/):

```json
{
    "$type": "color",
    "token-name": {
        "$value": "#0ea5e9"
    }
}
```

### Token Structure

```
packages/tokens/src/tokens.tokens.json
├── color           # Color palette
├── spacing         # Spacing scale
├── fontSize        # Type scale
├── fontWeight      # Font weights
├── lineHeight      # Line heights
└── breakpoint      # Responsive breakpoints
```

### Modifying Tokens

1. **Edit token file:**

    ```json
    // packages/tokens/src/tokens.tokens.json
    {
        "color": {
            "$type": "color",
            "primary": {
                "500": { "$value": "#0ea5e9" }
            }
        }
    }
    ```

2. **Rebuild tokens:**

    ```bash
    pnpm --filter @afnizarnur/tokens build
    ```

3. **Generated output:**

    ```css
    /* packages/tokens/dist/tokens.css */
    :root {
        --color-primary-500: #0ea5e9;
    }
    ```

4. **Use in code:**

    ```css
    color: var(--color-primary-500);
    ```

    Or with Tailwind:

    ```html
    <div class="text-primary-500"></div>
    ```

## Color System

### Primary Colors

Used for primary actions, links, and brand elements.

```
primary-50   #f0f9ff   Lightest - backgrounds, hover states
primary-100  #e0f2fe
primary-200  #bae6fd
primary-300  #7dd3fc
primary-400  #38bdf8
primary-500  #0ea5e9   ← Base color
primary-600  #0284c7
primary-700  #0369a1
primary-800  #075985
primary-900  #0c4a6e   Darkest - text on light backgrounds
```

**Usage:**

```html
<!-- Buttons -->
<button class="bg-primary-500 hover:bg-primary-600 text-white">Click me</button>

<!-- Links -->
<a class="text-primary-600 hover:text-primary-700"> Learn more </a>

<!-- Backgrounds -->
<div class="bg-primary-50 border border-primary-200">Info box</div>
```

### Neutral Colors

Used for text, borders, backgrounds, and general UI elements.

```
neutral-50   #fafafa   Lightest backgrounds
neutral-100  #f5f5f5   Card backgrounds
neutral-200  #e5e5e5   Borders
neutral-300  #d4d4d4   Disabled states
neutral-400  #a3a3a3   Placeholder text
neutral-500  #737373   Secondary text
neutral-600  #525252
neutral-700  #404040
neutral-800  #262626   Primary text
neutral-900  #171717   Darkest text
```

**Usage:**

```html
<!-- Text -->
<h1 class="text-neutral-900">Heading</h1>
<p class="text-neutral-700">Body text</p>
<span class="text-neutral-500">Secondary text</span>

<!-- Backgrounds -->
<div class="bg-neutral-50">Light background</div>
<div class="bg-neutral-100">Card background</div>

<!-- Borders -->
<div class="border border-neutral-200">Bordered element</div>
```

### Semantic Colors

Used for status messages, alerts, and feedback.

```
error    #ef4444   Errors, destructive actions
success  #10b981   Success messages, confirmations
warning  #f59e0b   Warnings, cautions
info     #3b82f6   Informational messages
```

**Usage:**

```html
<!-- Alerts -->
<div class="bg-error/10 border border-error text-error">Error message</div>

<div class="bg-success/10 border border-success text-success">Success message</div>

<!-- Status badges -->
<span class="bg-warning text-warning-900 px-2 py-1 rounded"> Pending </span>
```

### Color Contrast

Ensure sufficient contrast for accessibility:

**Text on Backgrounds:**

- Large text (18pt+): 3:1 minimum
- Normal text: 4.5:1 minimum
- UI components: 3:1 minimum

**Recommended Combinations:**

```html
<!-- ✅ Good contrast -->
<div class="bg-white text-neutral-900">
    <div class="bg-neutral-900 text-white">
        <div class="bg-primary-500 text-white">
            <!-- ❌ Poor contrast -->
            <div class="bg-neutral-200 text-neutral-300">
                <div class="bg-primary-100 text-primary-200"></div>
            </div>
        </div>
    </div>
</div>
```

**Tools:**

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Chrome DevTools (Lighthouse)

## Typography

### Font Sizes

```
xs    0.75rem   (12px)  - Small labels, captions
sm    0.875rem  (14px)  - Secondary text
base  1rem      (16px)  - Body text (default)
lg    1.125rem  (18px)  - Large body text
xl    1.25rem   (20px)  - Small headings
2xl   1.5rem    (24px)  - H4
3xl   1.875rem  (30px)  - H3
4xl   2.25rem   (36px)  - H2
5xl   3rem      (48px)  - H1
6xl   3.75rem   (60px)  - Display headings
```

### Font Weights

```
normal     400  - Body text
medium     500  - Emphasis
semibold   600  - Headings, buttons
bold       700  - Strong emphasis
```

### Line Heights

```
tight     1.25   - Large headings
normal    1.5    - Body text (default)
relaxed   1.75   - Long-form content
loose     2      - Extra readability
```

### Typography Scale

**Display Text:**

```html
<h1 class="text-6xl font-bold leading-tight">Display Heading</h1>
```

**Headings:**

```html
<h1 class="text-5xl font-bold leading-tight">Page Title</h1>
<h2 class="text-4xl font-semibold leading-tight">Section</h2>
<h3 class="text-3xl font-semibold leading-normal">Subsection</h3>
<h4 class="text-2xl font-semibold leading-normal">Sub-subsection</h4>
```

**Body Text:**

```html
<p class="text-base font-normal leading-normal">Regular paragraph text</p>

<p class="text-lg font-normal leading-relaxed">Large, easy-to-read body text</p>

<p class="text-sm font-normal leading-normal text-neutral-600">Secondary text or captions</p>
```

**Emphasis:**

```html
<strong class="font-semibold">Important text</strong>
<em class="italic">Emphasized text</em>
<span class="font-medium text-primary-600">Highlighted text</span>
```

## Spacing

Consistent spacing creates visual rhythm and hierarchy.

### Spacing Scale

```
0    0rem     (0px)
1    0.25rem  (4px)   - Tiny gaps
2    0.5rem   (8px)   - Small gaps
3    0.75rem  (12px)  - Default gaps
4    1rem     (16px)  - Medium gaps (base unit)
5    1.25rem  (20px)
6    1.5rem   (24px)  - Large gaps
8    2rem     (32px)  - Section spacing
10   2.5rem   (40px)
12   3rem     (48px)  - Large sections
16   4rem     (64px)  - Major sections
20   5rem     (80px)  - Page sections
```

### Spacing Usage

**Padding:**

```html
<!-- Component padding -->
<div class="p-4">Comfortable padding</div>
<div class="px-6 py-4">Horizontal/vertical padding</div>

<!-- Button padding -->
<button class="px-4 py-2">Button</button>
<button class="px-6 py-3">Large button</button>
```

**Margin:**

```html
<!-- Stack elements -->
<div class="space-y-4">
    <div>Item 1</div>
    <div>Item 2</div>
</div>

<!-- Section spacing -->
<section class="mb-12">Section</section>
<section class="my-16">Major section</section>
```

**Gap (Flexbox/Grid):**

```html
<!-- Flex gaps -->
<div class="flex gap-4">
    <div>Item 1</div>
    <div>Item 2</div>
</div>

<!-- Grid gaps -->
<div class="grid grid-cols-3 gap-6">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
</div>
```

## Components

### Button Patterns

**Primary Button:**

```html
<button
    class="
  px-6 py-3
  bg-primary-500 hover:bg-primary-600
  text-white font-semibold
  rounded-lg
  transition-colors duration-200
"
>
    Primary Action
</button>
```

**Secondary Button:**

```html
<button
    class="
  px-6 py-3
  bg-neutral-100 hover:bg-neutral-200
  text-neutral-900 font-semibold
  rounded-lg
  transition-colors duration-200
"
>
    Secondary Action
</button>
```

**Outline Button:**

```html
<button
    class="
  px-6 py-3
  border-2 border-primary-500
  text-primary-500 hover:bg-primary-50 font-semibold
  rounded-lg
  transition-colors duration-200
"
>
    Outline Action
</button>
```

### Card Patterns

**Basic Card:**

```html
<div
    class="
  bg-white
  border border-neutral-200
  rounded-lg
  p-6
  shadow-sm hover:shadow-md
  transition-shadow duration-200
"
>
    <h3 class="text-xl font-semibold mb-2">Card Title</h3>
    <p class="text-neutral-600">Card content</p>
</div>
```

**Project Card:**

```html
<article class="group">
    <div
        class="
    bg-neutral-50
    rounded-lg
    overflow-hidden
    border border-neutral-200
    transition-all duration-200
    hover:shadow-lg
  "
    >
        <img src="project.jpg" alt="Project" class="w-full h-64 object-cover" />
        <div class="p-6">
            <h3 class="text-2xl font-semibold mb-2">Project Title</h3>
            <p class="text-neutral-600 mb-4">Description</p>
            <div class="flex gap-2">
                <span class="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                    React
                </span>
                <span class="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                    TypeScript
                </span>
            </div>
        </div>
    </div>
</article>
```

### Form Patterns

**Input Field:**

```html
<div class="space-y-2">
    <label class="block text-sm font-medium text-neutral-700"> Email </label>
    <input
        type="email"
        class="
      w-full px-4 py-2
      border border-neutral-300
      rounded-lg
      focus:outline-none focus:ring-2 focus:ring-primary-500
      transition-all duration-200
    "
        placeholder="your@email.com"
    />
</div>
```

**Textarea:**

```html
<div class="space-y-2">
    <label class="block text-sm font-medium text-neutral-700"> Message </label>
    <textarea
        rows="4"
        class="
      w-full px-4 py-2
      border border-neutral-300
      rounded-lg
      focus:outline-none focus:ring-2 focus:ring-primary-500
      resize-y
      transition-all duration-200
    "
        placeholder="Your message..."
    ></textarea>
</div>
```

## Styling with Tailwind

### Tailwind CSS v4

This project uses **Tailwind CSS v4**, which introduces a CSS-first configuration approach. Key differences from v3:

- **No JS config file**: Configuration is done in CSS using directives
- **PostCSS plugin**: Uses `@tailwindcss/postcss` instead of the Astro integration
- **CSS directives**: `@theme`, `@source`, `@layer` for configuration
- **Design tokens**: Mapped directly in `global.css` using `@theme`

**Configuration location:**

- `apps/web/postcss.config.cjs` - PostCSS configuration
- `apps/web/src/styles/global.css` - Theme and token mapping

**Using @apply in component styles:**
When using `@apply` in Astro component `<style>` blocks, add the `@reference` directive:

```astro
<style>
    @reference "../styles/global.css";

    .my-class {
        @apply text-primary-600 font-semibold;
    }
</style>
```

### Utility-First Approach

Tailwind CSS is utility-first, meaning you compose designs using utility classes:

**❌ Don't create custom CSS for every component:**

```css
/* Avoid this */
.my-button {
    background-color: #0ea5e9;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
}
```

**✅ Use utility classes:**

```html
<button class="bg-primary-500 px-6 py-3 rounded-lg">Button</button>
```

### Component Extraction

When patterns repeat, extract them to components:

**React Component:**

```tsx
// apps/web/src/components/Button.tsx
interface ButtonProps {
    variant?: "primary" | "secondary"
    children: React.ReactNode
}

export function Button({ variant = "primary", children }: ButtonProps) {
    const baseClasses = "px-6 py-3 font-semibold rounded-lg transition-colors"
    const variantClasses = {
        primary: "bg-primary-500 hover:bg-primary-600 text-white",
        secondary: "bg-neutral-100 hover:bg-neutral-200 text-neutral-900",
    }

    return <button className={`${baseClasses} ${variantClasses[variant]}`}>{children}</button>
}
```

**Astro Component:**

```astro
---
// apps/web/src/components/Card.astro
export interface Props {
    title: string
    description: string
}

const { title, description } = Astro.props
---

<div class="bg-white border border-neutral-200 rounded-lg p-6">
    <h3 class="text-xl font-semibold mb-2">{title}</h3>
    <p class="text-neutral-600">{description}</p>
</div>
```

## Responsive Design

### Breakpoints

```
mobile   375px   - Small phones
tablet   768px   - Tablets and large phones
desktop  1440px  - Desktop and larger
```

### Tailwind Responsive Prefixes

```
(default)  - < 768px  (mobile-first)
md:        - ≥ 768px  (tablet and up)
lg:        - ≥ 1440px (desktop and up)
```

### Responsive Patterns

**Layout:**

```html
<!-- Stack on mobile, grid on tablet/desktop -->
<div
    class="
  grid
  grid-cols-1
  md:grid-cols-2
  lg:grid-cols-3
  gap-6
"
>
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
</div>
```

**Typography:**

```html
<h1
    class="
  text-3xl md:text-4xl lg:text-5xl
  font-bold
"
>
    Responsive Heading
</h1>
```

**Spacing:**

```html
<section
    class="
  px-4 md:px-8 lg:px-16
  py-8 md:py-12 lg:py-16
"
>
    Content
</section>
```

**Visibility:**

```html
<!-- Hide on mobile, show on tablet+ -->
<div class="hidden md:block">Desktop only</div>

<!-- Show on mobile, hide on tablet+ -->
<div class="md:hidden">Mobile only</div>
```

## Accessibility

### ARIA Labels

```html
<button aria-label="Close modal">
    <svg>...</svg>
</button>

<nav aria-label="Main navigation">
    <ul>
        ...
    </ul>
</nav>
```

### Focus States

Always include focus states for keyboard navigation:

```html
<button
    class="
  focus:outline-none
  focus:ring-2
  focus:ring-primary-500
  focus:ring-offset-2
"
>
    Accessible Button
</button>

<a
    class="
  focus:outline-none
  focus:underline
  focus:ring-2
  focus:ring-primary-500
"
>
    Accessible Link
</a>
```

### Color Contrast

Ensure text is readable:

```html
<!-- ✅ Good: High contrast -->
<div class="bg-neutral-900 text-white">
    <div class="bg-white text-neutral-900">
        <!-- ❌ Bad: Low contrast -->
        <div class="bg-neutral-200 text-neutral-400"></div>
    </div>
</div>
```

### Semantic HTML

Use proper HTML elements:

```html
<!-- ✅ Good: Semantic -->
<nav>
    <ul>
        <li><a href="/">Home</a></li>
    </ul>
</nav>

<!-- ❌ Bad: Non-semantic -->
<div class="nav">
    <div class="item" onclick="...">Home</div>
</div>
```

### Alt Text

Always provide alt text for images:

```html
<img src="photo.jpg" alt="Designer working on laptop" />

<!-- Decorative images -->
<img src="decoration.svg" alt="" role="presentation" />
```

## Best Practices

### Do's

✅ **Use design tokens consistently**

```html
<div class="text-primary-500"><!-- Use tokens --></div>
```

✅ **Follow spacing scale**

```html
<div class="p-4 mb-6"><!-- Use scale values --></div>
```

✅ **Maintain color contrast**

```html
<div class="bg-neutral-900 text-white"><!-- High contrast --></div>
```

✅ **Use semantic HTML**

```html
<button>Click</button><!-- Use <button>, not <div> --></div>
```

### Don'ts

❌ **Don't use hardcoded colors**

```html
<div style="color: #0ea5e9"><!-- Use text-primary-500 --></div>
```

❌ **Don't use arbitrary values**

```html
<div class="p-[13px]"><!-- Use scale: p-3 or p-4 --></div>
```

❌ **Don't ignore responsive design**

```html
<div class="w-[800px]"><!-- Use responsive widths --></div>
```

❌ **Don't skip accessibility**

```html
<div onclick="..."><!-- Use <button> --></div>
```

## Related Documentation

- [Architecture Overview](./architecture.md)
- [Development Workflow](./development-workflow.md)
- [AGENTS.md](../AGENTS.md) - Coding guidelines
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Terrazzo Documentation](https://terrazzo.app)
- [CLAUDE.md - Tailwind v4 Configuration](../CLAUDE.md#tailwind-css-v4-configuration)
