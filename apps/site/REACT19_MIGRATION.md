# React 19 Migration Notes

This app uses **React 19.2.0** with **Next.js 15.5.6**.

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

## Verification

To verify React 19 is working:
1. Start dev server: `pnpm dev`
2. Check for no `createContext` errors
3. Navigate between pages to test routing
4. Test theme toggle and mobile menu
