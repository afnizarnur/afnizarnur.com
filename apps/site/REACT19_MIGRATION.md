# React 19 & Next.js 15 Setup

This app uses the latest stable versions:
- **React 19.2.0**
- **Next.js 15.5.6**
- **Tailwind CSS 4.1.14** (PostCSS)

## Changes Made for React 19 Compatibility

### Icon Library Migration

**Before:**
- `phosphor-react` (React 18 only)

**After:**
- `@phosphor-icons/react` v2.x (React 19 compatible)

### Import Changes

```tsx
// Old (React 18)
import { Moon, Sun } from "phosphor-react"

// New (React 19)
import { Moon, Sun } from "@phosphor-icons/react"
```

### Component Architecture

**NavigationBar:**
- Changed from Server Component to Client Component
- Reason: Uses Phosphor icons which require client-side rendering
- Uses `usePathname()` hook for active route highlighting

## Breaking Changes from React 18

1. **Icons in Server Components**: `@phosphor-icons/react` uses Context API internally, making it incompatible with Server Components
2. **Solution**: Made NavigationBar a client component since it needs interactive elements anyway

## Current Component Types

**Client Components** ("use client"):
- NavigationBar
- MobileMenu
- ThemeToggle
- HorizontalHeader
- Widget

**Server Components**:
- PageHeader
- PostCard
- ProjectCard
- PortableText
- IconButton (accepts icon as prop)
- All page components

## Environment Setup

Create `.env.local` with:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=https://afnizarnur.com
```

## Tailwind CSS v4 Setup

**PostCSS Configuration:**
- Uses `@tailwindcss/postcss` plugin
- Configuration in `postcss.config.mjs`
- CSS imports in `app/styles/global.css`
- Design tokens from `@afnizarnur/tokens` package

**No Vite plugin needed** - Next.js uses PostCSS by default.

## Verification

To verify everything is working:
1. Start dev server: `pnpm dev`
2. Visit http://localhost:3000
3. Check for:
   - ✅ No `createContext` errors
   - ✅ Tailwind styles applied correctly
   - ✅ Theme toggle works
   - ✅ Mobile menu functions
   - ✅ Navigation highlights active route
