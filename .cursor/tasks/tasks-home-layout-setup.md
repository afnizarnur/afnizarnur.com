# Project Setup

Task to setup layout in homepage

## Completed Tasks

- [x] Setup layout grid 12 columns with margin left and right 24px, use gutter 24. In extra large screen max width center 1440px
- [x] Inside the main container, there is sidebar that will use 4 column, 100% height, with padding 24px
    - [x] Sidebar it will use position fixed in desktop there is gray border right in it
    - [x] Sidebar in mobile will be position in the top but not fixed, scroll with parent, not 100% height
- [x] Inside the main container beside the sidebar, there is main content will hold all content, it will use 8 column based on the grid in desktop. The padding also 24px

## In Progress Tasks

## Future Tasks

## Implementation Plan

Created HomeLayout.astro with a responsive 12-column grid layout:

- Sidebar takes 4 columns on desktop (fixed position)
- Main content takes 8 columns
- On mobile, the layout stacks vertically

### Relevant Files

- src/layouts/HomeLayout.astro - Main layout component with the grid structure
- src/components/SidebarContent.astro - Component for sidebar content
- src/components/Welcome.astro - Component for main content with portfolio items
- src/pages/index.astro - Updated to use the new layout and components
