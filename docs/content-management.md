# Content Management Guide

This guide explains how to manage content for afnizarnur.com using Sanity Studio. It covers content types, workflows, best practices, and troubleshooting.

## Table of Contents

- [Getting Started](#getting-started)
- [Content Types](#content-types)
- [Content Workflows](#content-workflows)
- [Best Practices](#best-practices)
- [SEO Guidelines](#seo-guidelines)
- [Media Management](#media-management)
- [Troubleshooting](#troubleshooting)

## Getting Started

### Accessing Sanity Studio

**Local Development:**

```bash
cd afnizarnur.com
pnpm --filter @afnizarnur/studio dev
```

Studio will be available at `http://localhost:3333`

**Production Studio:**
Visit your deployed studio at `https://[your-studio-name].sanity.studio`

### First-Time Setup

1. **Sign in** with your Sanity account
2. **Select the project** (afnizarnur.com)
3. **Choose the dataset** (usually "production")
4. **Start creating content**

## Content Types

### 1. Posts (Blog Articles)

Blog posts are articles that appear in the `/blog` section of the website.

**Required Fields:**

- **Title** (max 100 characters)
    - Clear, descriptive title
    - Used in page title and social shares

- **Slug** (auto-generated from title)
    - URL-friendly identifier
    - Example: "my-first-post" → `/blog/my-first-post`
    - Can be customized but should not be changed after publishing

- **Published At** (datetime)
    - Publication date and time
    - Used for sorting and display
    - Can be future-dated for scheduled publishing

- **Excerpt** (50-200 characters)
    - Brief summary of the post
    - Displayed in post listings
    - Used in meta descriptions

**Optional Fields:**

- **Body** (rich text)
    - Main content of the post
    - Supports:
        - Text formatting (bold, italic, headings)
        - Lists (ordered and unordered)
        - Links
        - Images (inline)
        - Code blocks

- **Tags** (references)
    - Categorize your posts
    - Multiple tags allowed
    - Create tags first in the Tags section

- **Cover Image**
    - Featured image for the post
    - Recommended size: 1200x630px
    - Include alt text for accessibility

- **SEO** (object)
    - Custom meta title
    - Custom meta description
    - Keywords (comma-separated)

**Example Post Structure:**

```
Title: "Building a Design System with Terrazzo"
Slug: building-design-system-terrazzo
Published At: 2024-10-11T10:00:00Z
Excerpt: "Learn how to create a scalable design system using Terrazzo
          and integrate it with Tailwind CSS."
Body: [Rich text content with images and formatting]
Tags: [Design Systems, CSS, Tools]
Cover Image: design-system-hero.jpg
SEO:
  Title: "Building a Design System with Terrazzo | Afnizar Nur"
  Description: "A comprehensive guide to creating design systems..."
  Keywords: "design system, terrazzo, tailwind, css variables"
```

### 2. Projects (Portfolio Items)

Projects showcase your work in the `/work` section.

**Required Fields:**

- **Title** (max 80 characters)
    - Project name
    - Keep it concise and clear

- **Slug** (auto-generated)
    - URL identifier
    - Example: "ecommerce-redesign" → `/work/ecommerce-redesign`

- **Description** (50-150 characters)
    - One-sentence summary
    - Displayed in project listings

- **Role** (array of strings)
    - Your role(s) in the project
    - Examples: "UI Designer", "Frontend Developer", "Product Designer"
    - Multiple roles supported

**Optional Fields:**

- **Selected** (boolean)
    - Mark as featured project
    - Featured projects appear first on homepage
    - Default: false

- **Gallery** (array of images, max 10)
    - Project screenshots/images
    - Include alt text for each image
    - First image used as cover
    - Recommended size: 1600x1200px

- **Links** (array of link objects)
    - External links (live site, case study, etc.)
    - Each link has:
        - Label: "View Live Site", "Read Case Study"
        - URL: Full URL with https://

- **Body** (rich text)
    - Detailed project description
    - Process, challenges, solutions
    - Supports images and formatting

- **Technologies** (array of strings)
    - Tech stack used
    - Examples: "React", "TypeScript", "Figma"
    - Displayed as tags

- **Year** (number)
    - Project year (2000-current year + 1)
    - Used for chronological sorting

- **Client** (string, max 80 characters)
    - Client or company name
    - Optional for personal projects

- **SEO** (object)
    - Same structure as Posts

**Example Project Structure:**

```
Title: "E-commerce Redesign"
Slug: ecommerce-redesign
Description: "Complete redesign of an e-commerce platform focusing
              on conversion optimization and mobile experience."
Role: ["Product Designer", "UI Designer"]
Selected: true
Gallery: [hero.jpg, mobile-views.jpg, checkout-flow.jpg]
Links:
  - Label: "View Live Site", URL: "https://example.com"
  - Label: "Case Study", URL: "https://behance.net/..."
Body: [Detailed case study content]
Technologies: ["Figma", "React", "TypeScript", "Tailwind CSS"]
Year: 2024
Client: "Example Corp"
```

### 3. Pages (Custom Pages)

Create custom pages like "About", "Contact", etc.

**Fields:**

- **Title** (required, max 100 characters)
- **Slug** (required, auto-generated)
- **Body** (optional, rich text)
- **SEO** (optional, object)

**Example:**

```
Title: "About Me"
Slug: about
Body: [Biography, experience, skills, etc.]
SEO: [Custom meta tags]
```

### 4. Tags (Taxonomy)

Tags help categorize posts and make content discoverable.

**Fields:**

- **Title** (required, max 50 characters)
    - Tag name (e.g., "Design Systems", "JavaScript", "Tutorial")

- **Slug** (required, auto-generated)
    - URL-friendly identifier

- **Description** (optional, max 200 characters)
    - Brief explanation of what this tag represents

**Best Practices:**

- Create tags before tagging posts
- Use title case for tag names
- Keep tags specific but not too narrow
- Limit to 3-5 tags per post
- Review and consolidate similar tags regularly

### 5. Navigation (Site Structure)

Define the main navigation menu.

**Fields:**

- **Title** (required)
    - Navigation label (e.g., "Work", "Blog", "About")

- **Items** (array)
    - Navigation links
    - Order determines display order
    - Each item has:
        - Label: Display text
        - URL: Internal (/about) or external (https://...)

### 6. Site Settings (Global Configuration)

Global site configuration.

**Fields:**

- **Site Title** (required)
- **Site Description** (required)
- **Site URL** (required)
- **Social Links** (optional)
    - Twitter, GitHub, LinkedIn, etc.
- **Default SEO** (optional)
    - Default meta tags for pages

## On-Demand Revalidation Setup

By default, ISR (Incremental Static Regeneration) caches content for a specific duration. To get instant updates when you publish content in Sanity Studio, you need to set up webhooks for on-demand revalidation.

### Prerequisites

1. Deployed Next.js site with the revalidation endpoint
2. Access to Sanity project settings

### Step 1: Generate a Secret Token

Generate a secure random string to authenticate webhook requests:

```bash
openssl rand -base64 32
```

Copy the generated string.

### Step 2: Add Secret to Environment Variables

**Local Development (.env.local):**

```env
SANITY_REVALIDATE_SECRET=your_generated_secret_here
```

**Production (Netlify):**

1. Go to your Netlify site dashboard
2. Navigate to Site configuration → Environment variables
3. Add new variable:
   - Key: `SANITY_REVALIDATE_SECRET`
   - Value: Your generated secret
4. Redeploy your site

### Step 3: Create Sanity Webhook

1. Go to [Sanity Manage](https://www.sanity.io/manage)
2. Select your project
3. Navigate to **API** → **Webhooks**
4. Click **Create webhook**
5. Configure the webhook:

**Webhook Configuration:**

```
Name: Production Revalidation
Description: Trigger ISR revalidation on content changes
URL: https://your-site.com/api/revalidate?secret=YOUR_SECRET
Dataset: production (or your dataset name)
Trigger on: Create, Update, Delete
Filter: Leave empty (revalidates all content types)
HTTP method: POST
API version: v2021-03-25 (or latest)
Include drafts: No
```

Replace:
- `https://your-site.com` with your actual site URL
- `YOUR_SECRET` with the secret you generated in Step 1

### Step 4: Test the Webhook

**Testing in Production:**

1. Click **Save** to create the webhook
2. Click **Test webhook** button
3. You should see a successful response:

```json
{
  "revalidated": true,
  "tags": ["settings"],
  "now": 1234567890
}
```

**Testing Locally:**

To test the endpoint during development:

1. Add `SANITY_REVALIDATE_SECRET=test-secret` to your `.env.local`
2. Start your dev server: `pnpm --filter @afnizarnur/site dev`
3. Run the test script:

```bash
cd apps/site
./scripts/test-revalidation.sh test-secret http://localhost:3000/api/revalidate
```

Or test manually with curl:

```bash
curl -X POST "http://localhost:3000/api/revalidate?secret=test-secret" \
  -H "Content-Type: application/json" \
  -d '{"_type": "siteSettings", "_id": "siteSettings"}'
```

### Step 5: Verify Revalidation Works

1. In Sanity Studio, make a change to Site Settings (e.g., update site description)
2. Click **Publish**
3. Check your deployed site immediately
4. The change should appear within 1-2 seconds (no need to wait for ISR cache)

### Supported Content Types

The webhook automatically revalidates the correct cache tags based on document type:

| Document Type | Cache Tags Revalidated |
|---------------|------------------------|
| `siteSettings` | `settings` |
| `navigation` | `navigation` |
| `post` | `posts`, `post-{slug}` |
| `project` | `projects`, `project-{slug}` |
| `page` | `page-{slug}` |
| `tag` | `tags`, `tag-{slug}` |

### Webhook Security

- The secret token must match between Sanity and your environment variables
- Requests without valid secrets are rejected with `401 Unauthorized`
- Only POST requests are accepted
- Webhook endpoint logs all revalidation attempts

### Troubleshooting Webhooks

**Webhook fails with 401 Unauthorized:**
- Check that `SANITY_REVALIDATE_SECRET` is set in production
- Verify the secret in the webhook URL matches the environment variable
- Ensure your site has been redeployed after adding the environment variable

**Webhook succeeds but content doesn't update:**
- Check that the correct cache tags are being revalidated (check webhook response)
- Verify ISR is working by checking `revalidate` values in queries
- Clear browser cache (hard refresh with Cmd+Shift+R or Ctrl+Shift+F5)

**Webhook fails with 500 error:**
- Check Netlify function logs for errors
- Verify the Next.js deployment is healthy
- Test the endpoint manually: `POST https://your-site.com/api/revalidate?secret=YOUR_SECRET`

### Multiple Environments

To set up webhooks for multiple environments (staging, production):

1. Create separate webhooks for each environment
2. Use different URLs:
   - Production: `https://afnizarnur.com/api/revalidate?secret=PROD_SECRET`
   - Staging: `https://staging.afnizarnur.com/api/revalidate?secret=STAGING_SECRET`
3. Use the same or different secrets per environment

## Content Workflows

### Publishing a New Blog Post

1. **Create Draft**
    - Navigate to "Post" in Sanity Studio
    - Click "Create new Post"
    - Fill in required fields (Title, Slug, Published At, Excerpt)

2. **Write Content**
    - Add body content using the rich text editor
    - Insert images inline if needed
    - Format text with headings, lists, links

3. **Add Metadata**
    - Select relevant tags (create new ones if needed)
    - Upload cover image with alt text
    - Fill in SEO fields for better search visibility

4. **Review & Publish**
    - Preview content in Studio
    - Check for typos and formatting
    - Click "Publish" button
    - Content will trigger automatic revalidation (if webhooks are set up)

5. **Verify**
    - With webhooks: Changes appear instantly (1-2 seconds)
    - Without webhooks: Wait for ISR cache to expire (based on revalidate time)
    - Visit the live post URL
    - Check formatting, images, and links

**Note:** For instant updates, set up [on-demand revalidation webhooks](#on-demand-revalidation-setup)

### Adding a New Project

1. **Prepare Assets**
    - Gather project images (1600x1200px recommended)
    - Prepare descriptions and case study text
    - Collect external links (live site, case study, etc.)

2. **Create Project**
    - Navigate to "Project" in Sanity Studio
    - Click "Create new Project"
    - Fill in title, slug, description, role

3. **Upload Gallery**
    - Add project images to gallery
    - Include alt text for accessibility
    - First image becomes the cover

4. **Add Details**
    - Write detailed body content (process, challenges, solutions)
    - Add technologies used
    - Set year and client name
    - Add external links

5. **Feature (Optional)**
    - Toggle "Selected" to feature on homepage
    - Only feature your best work

6. **Publish & Verify**
    - Click "Publish"
    - Wait for deployment
    - Check `/work` page and individual project page

### Updating Existing Content

1. **Find Content**
    - Use search bar or browse content lists
    - Click on item to edit

2. **Make Changes**
    - Edit fields as needed
    - Studio auto-saves drafts

3. **Publish Changes**
    - Click "Publish" to make changes live
    - Site will rebuild automatically

4. **Important Notes**
    - **Never change slugs** after publishing (breaks links)
    - **Check references** when deleting tags
    - **Preserve image URLs** when possible

### Scheduling Content

To schedule a post for future publication:

1. Set "Published At" to a future date/time
2. Publish the document in Sanity
3. On the website, implement a filter to show only posts where `publishedAt <= now()`

**Note:** The site currently shows all published posts. To implement scheduling, you'll need to add date filtering in the Next.js Server Components that fetch posts.

## Best Practices

### Writing Guidelines

**Post Titles:**

- Keep under 60 characters for SEO
- Be descriptive and specific
- Use title case
- Avoid clickbait

**Excerpts:**

- Write compelling summaries (50-200 chars)
- Don't just copy the first paragraph
- Include key takeaways or hooks

**Body Content:**

- Use headings (H2, H3) for structure
- Keep paragraphs short (2-4 sentences)
- Use lists for scannable content
- Add images to break up text
- Link to relevant internal and external resources

**Project Descriptions:**

- Focus on outcomes and impact
- Highlight your specific contributions
- Use concrete numbers when possible
- Tell a story (problem → solution → result)

### Content Structure

**Heading Hierarchy:**

```
Post Title (H1 - automatic)
├── Main Section (H2)
│   ├── Subsection (H3)
│   └── Subsection (H3)
├── Main Section (H2)
└── Main Section (H2)
```

**Rich Text Formatting:**

- **Bold** for emphasis
- _Italic_ for quotes or emphasis
- `Code` for inline code
- Links for references
- Lists for steps or items

### Content Organization

**Tagging Strategy:**

- Use 2-4 tags per post
- Prioritize broad, reusable tags
- Create new tags only when necessary
- Audit tags quarterly

**Project Organization:**

- Feature only your best work (3-5 projects)
- Keep gallery to 5-7 high-quality images
- Update older projects with new images/info
- Archive outdated projects

## SEO Guidelines

### Optimizing for Search Engines

**Title Tags:**

- Include primary keyword
- Keep under 60 characters
- Make it unique and descriptive
- Format: "Page Title | Site Name"

**Meta Descriptions:**

- 150-160 characters
- Include primary keyword naturally
- Write for humans, not robots
- Include a call-to-action

**Keywords:**

- Focus on 2-3 primary keywords
- Use long-tail keywords
- Don't keyword stuff
- Research with Google Search Console

**Images:**

- Always include alt text
- Use descriptive filenames
- Optimize file size (< 200KB)
- Use modern formats (WebP when possible)

**URLs (Slugs):**

- Keep short and descriptive
- Use hyphens, not underscores
- Use lowercase only
- Avoid dates in URLs (for evergreen content)

### Example SEO Setup

**Blog Post:**

```
Title: Building a Design System with Terrazzo
SEO Title: Building a Design System with Terrazzo | Afnizar Nur
SEO Description: Learn how to create scalable design systems using
                 Terrazzo and integrate with Tailwind CSS. Complete
                 guide with examples.
Keywords: design system, terrazzo, design tokens, tailwind css
URL: /blog/building-design-system-terrazzo
```

**Project:**

```
Title: E-commerce Redesign
SEO Title: E-commerce Platform Redesign Case Study | Afnizar Nur
SEO Description: Complete redesign of a major e-commerce platform.
                 See how we improved conversion by 35% through UX
                 optimization.
Keywords: ecommerce design, ux case study, conversion optimization
URL: /work/ecommerce-redesign
```

## Media Management

### Image Guidelines

**Recommended Sizes:**

- Blog cover images: 1200x630px (OG image standard)
- Project gallery: 1600x1200px or 1920x1080px
- Inline images: 800-1200px wide
- Icons/logos: SVG preferred, or PNG at 2x size

**File Formats:**

- Photos: JPG (optimized quality 80-90%)
- Graphics: PNG or SVG
- Avoid: BMP, TIFF

**File Size:**

- Cover images: < 200KB
- Gallery images: < 300KB
- Inline images: < 150KB

**Image Optimization Tools:**

- [TinyPNG](https://tinypng.com/) - Compress PNG/JPG
- [Squoosh](https://squoosh.app/) - Advanced optimization
- [ImageOptim](https://imageoptim.com/) - Mac app

### Uploading Images

1. **In Sanity Studio:**
    - Click image field
    - Drag & drop or click to upload
    - Add alt text (required for accessibility)
    - Image is automatically uploaded to Sanity CDN

2. **Best Practices:**
    - Optimize before uploading
    - Use descriptive filenames
    - Always add alt text
    - Crop/resize to appropriate dimensions

### Alt Text Guidelines

**Good Alt Text:**

- Describes the image content
- Provides context
- Kept under 125 characters
- Omits "image of" or "picture of"

**Examples:**

```
❌ Bad: "screenshot"
✅ Good: "Dashboard showing analytics with graph and metrics"

❌ Bad: "image of a person"
✅ Good: "Designer working on laptop with design mockups visible"

❌ Bad: "img_1234.jpg"
✅ Good: "Modern e-commerce checkout flow wireframe"
```

## Troubleshooting

### Common Issues

**Problem: Content not showing on website**

- **Check:** Is the document published (not just saved as draft)?
- **Check:** Has Netlify deployment finished? (Check deploy status)
- **Check:** Clear browser cache and refresh
- **Solution:** If still not visible, trigger manual deploy in Netlify

**Problem: Images not loading**

- **Check:** Are images properly uploaded in Sanity?
- **Check:** Is alt text provided?
- **Check:** Are images too large (>5MB)?
- **Solution:** Re-upload optimized images

**Problem: Slug conflict**

- **Error:** "Document already exists with this slug"
- **Solution:** Choose a different slug or update the existing document

**Problem: Can't publish (validation errors)**

- **Check:** Red indicators show which fields have errors
- **Check:** Required fields must be filled
- **Check:** Character limits (titles, descriptions)
- **Solution:** Fix validation errors before publishing

**Problem: Rich text editor not working**

- **Solution:** Refresh the page
- **Solution:** Clear browser cache
- **Solution:** Try a different browser

### Getting Help

**Studio Issues:**

- Check [Sanity Documentation](https://www.sanity.io/docs)
- Visit [Sanity Slack Community](https://slack.sanity.io/)
- Check browser console for errors

**Content Questions:**

- Review this guide
- Check existing content for examples
- Ask the development team

## Content Checklist

### Before Publishing a Post

- [ ] Title is clear and under 60 characters
- [ ] Slug is URL-friendly and unique
- [ ] Published date is set correctly
- [ ] Excerpt is compelling (50-200 characters)
- [ ] Body content is well-formatted
- [ ] Images have alt text
- [ ] 2-4 relevant tags selected
- [ ] Cover image uploaded (1200x630px)
- [ ] SEO fields completed
- [ ] Content proofread for typos
- [ ] Links tested and working

### Before Publishing a Project

- [ ] Title and description are clear
- [ ] Role(s) accurately reflect your contribution
- [ ] Gallery images optimized and uploaded
- [ ] All images have alt text
- [ ] Body content tells a complete story
- [ ] Technologies list is accurate
- [ ] Year and client info included
- [ ] External links working
- [ ] SEO fields completed
- [ ] "Selected" toggle set appropriately
- [ ] Content proofread

## Related Documentation

- [Architecture Overview](./architecture.md) - System architecture
- [Deployment Guide](./deployment.md) - Deployment process
- [Development Workflow](./development-workflow.md) - Development guide
