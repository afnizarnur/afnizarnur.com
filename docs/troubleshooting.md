# Troubleshooting Guide

This guide helps you diagnose and fix common issues you might encounter while developing or deploying afnizarnur.com.

## Table of Contents

- [Build Issues](#build-issues)
- [Development Server Issues](#development-server-issues)
- [Type Errors](#type-errors)
- [Dependency Issues](#dependency-issues)
- [Deployment Issues](#deployment-issues)
- [Sanity Studio Issues](#sanity-studio-issues)
- [Content Issues](#content-issues)
- [Performance Issues](#performance-issues)

## Build Issues

### Build Fails with "Cannot find module"

**Symptoms:**
```
Error: Cannot find module '@afnizarnur/tokens'
Error: Cannot find module '@afnizarnur/config-eslint'
```

**Causes:**
- Shared packages not built
- Package dependencies out of sync
- Node modules corrupted

**Solutions:**

**1. Rebuild shared packages:**
```bash
pnpm turbo run build --filter="@afnizarnur/config-*" --filter="@afnizarnur/tokens"
```

**2. Clean and reinstall:**
```bash
pnpm clean
pnpm install
pnpm build
```

**3. Clear Turbo cache:**
```bash
rm -rf .turbo
pnpm build
```

**4. Full reset:**
```bash
rm -rf node_modules pnpm-lock.yaml
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules
pnpm install
pnpm turbo run build --filter="@afnizarnur/config-*" --filter="@afnizarnur/tokens"
pnpm build
```

### Build Fails with "Out of memory"

**Symptoms:**
```
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
```

**Causes:**
- Large build process
- Memory-intensive operations
- Many images to process

**Solutions:**

**1. Increase Node memory:**
```bash
export NODE_OPTIONS="--max-old-space-size=4096"
pnpm build
```

**2. Build sequentially (disable parallelism):**
```bash
pnpm turbo run build --concurrency=1
```

**3. Optimize images before building:**
- Compress images before uploading to Sanity
- Reduce image sizes
- Use modern formats (WebP)

### Build Succeeds but Site Doesn't Work

**Symptoms:**
- Build completes without errors
- Deployed site shows errors or blank pages
- Console shows 404 errors

**Causes:**
- Missing environment variables
- Incorrect build output directory
- Asset path issues

**Solutions:**

**1. Check environment variables:**
```bash
# Verify .env files exist and are correct
cat apps/web/.env

# Should contain:
# PUBLIC_SANITY_PROJECT_ID=your-project-id
# PUBLIC_SANITY_DATASET=production
# PUBLIC_SITE_URL=https://afnizarnur.com
```

**2. Verify build output:**
```bash
# Check dist directory exists and has content
ls -la apps/web/dist
# Should contain index.html and other files
```

**3. Test locally:**
```bash
pnpm --filter @afnizarnur/web build
pnpm --filter @afnizarnur/web preview
# Visit http://localhost:4321
```

## Development Server Issues

### Port Already in Use

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::4321
Error: listen EADDRINUSE: address already in use :::3333
```

**Causes:**
- Previous dev server still running
- Another app using the same port

**Solutions:**

**1. Kill process on port:**
```bash
# For web app (port 4321)
lsof -ti:4321 | xargs kill -9

# For studio (port 3333)
lsof -ti:3333 | xargs kill -9
```

**2. Use different port:**
```bash
# Web app
pnpm --filter @afnizarnur/web dev -- --port 4322

# Studio
pnpm --filter @afnizarnur/studio dev -- --port 3334
```

**3. Kill all Node processes:**
```bash
killall node
```

### Hot Reload Not Working

**Symptoms:**
- File changes don't trigger updates
- Need to manually refresh browser
- Dev server doesn't detect changes

**Causes:**
- File watcher limits reached (Linux)
- IDE interfering with file watching
- Symbolic link issues

**Solutions:**

**1. Clear Astro cache:**
```bash
rm -rf apps/web/.astro
pnpm --filter @afnizarnur/web dev
```

**2. Increase file watch limit (Linux/Mac):**
```bash
# Temporarily
ulimit -n 10000

# Permanently (add to ~/.zshrc or ~/.bashrc)
echo "ulimit -n 10000" >> ~/.zshrc
```

**3. Restart dev server:**
```bash
# Stop all dev servers (Ctrl+C)
# Then restart
pnpm dev
```

**4. Check IDE settings:**
- Disable "Safe Write" in VS Code/JetBrains IDEs
- Ensure IDE isn't excluding watch directories

### Dev Server Shows Blank Page

**Symptoms:**
- Server starts successfully
- Browser shows blank page
- No errors in console

**Causes:**
- Content fetch failure
- Missing Sanity credentials
- CORS issues

**Solutions:**

**1. Check browser console:**
- Open DevTools (F12)
- Look for errors in Console tab
- Check Network tab for failed requests

**2. Verify Sanity connection:**
```bash
# Check environment variables
cat apps/web/.env

# Test Sanity connection
curl https://[PROJECT_ID].api.sanity.io/v2021-10-21/data/query/production?query=*[_type==\"post\"]
```

**3. Check Sanity credentials:**
- Visit https://sanity.io/manage
- Verify project ID and dataset name
- Ensure dataset is not private (or add token)

## Type Errors

### TypeScript Errors After Updating Dependencies

**Symptoms:**
```
Type error: Property 'x' does not exist on type 'Y'
Type error: Cannot find name 'Z'
```

**Causes:**
- Type definitions out of sync
- Breaking changes in dependencies
- Cache issues

**Solutions:**

**1. Clear TypeScript cache:**
```bash
rm -rf apps/web/node_modules/.astro
rm -rf apps/web/.astro
pnpm typecheck
```

**2. Regenerate lock file:**
```bash
rm pnpm-lock.yaml
pnpm install
pnpm typecheck
```

**3. Update type definitions:**
```bash
pnpm add -D @types/node@latest
pnpm add -D @types/react@latest
```

**4. Check for breaking changes:**
- Review changelogs of updated packages
- Update code to match new types
- Run `pnpm outdated` to see version changes

### Astro Type Errors

**Symptoms:**
```
Cannot find module '@/components/...'
Property does not exist on type 'Astro.props'
```

**Causes:**
- Missing path aliases configuration
- Props not properly typed
- Astro types not loaded

**Solutions:**

**1. Restart TypeScript server:**
- VS Code: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"

**2. Check tsconfig.json:**
```json
{
  "extends": "@afnizarnur/config-typescript/base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**3. Add prop types to Astro components:**
```astro
---
export interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---
```

## Dependency Issues

### pnpm Install Fails

**Symptoms:**
```
ERR_PNPM_PEER_DEP_ISSUES
ERR_PNPM_FETCH_404
```

**Causes:**
- Network issues
- Package version conflicts
- Corrupted lock file

**Solutions:**

**1. Clear pnpm cache:**
```bash
pnpm store prune
pnpm install
```

**2. Delete and regenerate lock file:**
```bash
rm pnpm-lock.yaml
pnpm install
```

**3. Use --force flag:**
```bash
pnpm install --force
```

**4. Check network connection:**
```bash
# Test npm registry access
curl https://registry.npmjs.org/@afnizarnur/tokens
```

### Version Conflicts

**Symptoms:**
```
ERR_PNPM_PEER_DEP_ISSUES Unmet peer dependencies
```

**Causes:**
- Incompatible package versions
- Peer dependency requirements not met

**Solutions:**

**1. Check peer dependencies:**
```bash
pnpm why [package-name]
```

**2. Update dependencies:**
```bash
pnpm update
```

**3. Install peer dependencies:**
```bash
pnpm add [missing-peer-dep]
```

**4. Use legacy peer deps (last resort):**
```bash
pnpm install --legacy-peer-deps
```

## Deployment Issues

### Netlify Build Fails

**Symptoms:**
- Build fails in Netlify
- Works locally but not in CI
- Timeout errors

**Causes:**
- Missing environment variables
- Build command incorrect
- Dependency installation issues
- Build timeout (default 15 minutes)

**Solutions:**

**1. Check Netlify environment variables:**
- Go to Site Settings → Build & Deploy → Environment
- Ensure all required variables are set:
  - `PUBLIC_SANITY_PROJECT_ID`
  - `PUBLIC_SANITY_DATASET`
  - `PUBLIC_SITE_URL`

**2. Verify build settings:**
```
Build command: pnpm build
Publish directory: apps/web/dist
Base directory: (leave empty)
```

**3. Check Netlify build logs:**
- Identify exact error from logs
- Look for "ERR!" messages
- Check for dependency issues

**4. Test build locally:**
```bash
# Simulate Netlify build
rm -rf node_modules
pnpm install
pnpm build
```

**5. Increase build timeout (if needed):**
- Contact Netlify support for timeout increase
- Or optimize build (reduce images, etc.)

### Deploy Succeeds but Content Not Updated

**Symptoms:**
- New content published in Sanity
- Site deployed successfully
- Content not showing on site

**Causes:**
- Webhook not configured
- Cache not invalidated
- Build triggered before publish

**Solutions:**

**1. Check webhook configuration:**
- Sanity: Project Settings → API → Webhooks
- Ensure webhook URL is correct
- Verify events include "Publish"

**2. Trigger manual deploy:**
- Netlify Dashboard → Deploys → Trigger Deploy → Deploy Site

**3. Clear CDN cache:**
- Netlify Dashboard → Deploys → [Latest] → Clear cache and retry deploy

**4. Verify content is published:**
- Open Sanity Studio
- Check document status (should be "Published", not "Draft")

### 404 Errors on Deployed Site

**Symptoms:**
- Homepage works
- Other pages show 404
- Works locally

**Causes:**
- SPA mode not configured
- Netlify redirects missing
- Build output incomplete

**Solutions:**

**1. Add _redirects file:**
```
# apps/web/public/_redirects
/* /index.html 200
```

Or use `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**2. Check Astro output mode:**
```javascript
// astro.config.mjs
export default defineConfig({
  output: 'static',
  adapter: netlify(),
});
```

**3. Verify build output:**
```bash
# Check that all pages are generated
ls -R apps/web/dist
```

## Sanity Studio Issues

### Studio Won't Start

**Symptoms:**
```
Error: Could not find Sanity project
Error: Invalid project ID
```

**Causes:**
- Missing environment variables
- Incorrect Sanity configuration
- Sanity CLI not initialized

**Solutions:**

**1. Check environment variables:**
```bash
cat apps/studio/.env

# Should contain:
# SANITY_STUDIO_PROJECT_ID=your-project-id
# SANITY_STUDIO_DATASET=production
```

**2. Verify sanity.config.ts:**
```typescript
export default defineConfig({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  // ...
});
```

**3. Reinstall Sanity:**
```bash
pnpm --filter @afnizarnur/studio add sanity@latest
```

### Can't Save Documents in Studio

**Symptoms:**
- "Failed to save document" error
- Permission denied errors
- Network errors

**Causes:**
- No write permissions on dataset
- Network issues
- Schema validation errors

**Solutions:**

**1. Check permissions:**
- Visit https://sanity.io/manage
- Go to API → Tokens
- Ensure you're logged in with correct account

**2. Check schema validation:**
- Look for required fields not filled
- Check field types match schema
- Review validation rules

**3. Check browser console:**
- Open DevTools
- Look for specific error messages
- Check Network tab for API errors

### Schema Changes Not Reflected

**Symptoms:**
- Modified schema file
- Studio doesn't show changes
- Fields missing or incorrect

**Causes:**
- Dev server needs restart
- Browser cache
- Schema not registered

**Solutions:**

**1. Restart Studio:**
```bash
# Stop studio (Ctrl+C)
pnpm --filter @afnizarnur/studio dev
```

**2. Clear browser cache:**
- Hard refresh (Cmd/Ctrl + Shift + R)
- Or open in incognito mode

**3. Verify schema is registered:**
```typescript
// apps/studio/schemas/index.ts
export const schemaTypes = [
  myNewSchema, // Make sure it's included
  // ...
];
```

## Content Issues

### Content Not Showing on Website

**Symptoms:**
- Content published in Sanity
- Not appearing on website
- No errors in console

**Causes:**
- Site not rebuilt after publish
- Content filtering (unpublished, future-dated)
- GROQ query issues

**Solutions:**

**1. Trigger rebuild:**
```bash
# Manually trigger Netlify deploy
# Or wait for webhook (2-5 minutes)
```

**2. Check content status:**
- Verify document is "Published" in Studio
- Check publish date is not in future
- Ensure content passes any filters

**3. Test GROQ query:**
- Open Sanity Studio
- Go to Vision tool
- Test query:
  ```groq
  *[_type == "post"] {
    _id,
    title,
    slug,
    publishedAt
  }
  ```

**4. Check for errors in build logs:**
- View Netlify build logs
- Look for Sanity API errors

### Images Not Loading

**Symptoms:**
- Broken image icons
- 404 errors for images
- Images work in Studio but not on site

**Causes:**
- Missing alt text
- Image URL incorrect
- Sanity CDN issues

**Solutions:**

**1. Check image field:**
```typescript
// Ensure you're using Sanity image URL builder
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

// Usage
<img src={urlFor(post.coverImage).width(800).url()} />
```

**2. Verify alt text:**
- All images should have alt text in Sanity
- Check schema requires alt field

**3. Check CORS:**
- Sanity: Project Settings → API → CORS origins
- Add your domain (e.g., https://afnizarnur.com)

## Performance Issues

### Slow Build Times

**Symptoms:**
- Build takes > 5 minutes
- Longer than expected

**Causes:**
- Many pages to generate
- Large images
- Too many dependencies

**Solutions:**

**1. Enable Turbo cache:**
```bash
# Cache is automatic, but ensure .turbo/ exists
ls -la .turbo
```

**2. Optimize images:**
- Compress before uploading
- Use appropriate sizes
- Consider lazy loading

**3. Profile build:**
```bash
# See which tasks take longest
pnpm turbo run build --profile
```

**4. Use incremental builds:**
- Only rebuild changed packages
- Leverage Turbo's dependency graph

### Slow Page Loads

**Symptoms:**
- Pages take long to load
- Large bundle sizes
- Slow Time to Interactive

**Causes:**
- Too much JavaScript
- Large images
- No code splitting

**Solutions:**

**1. Analyze bundle:**
```bash
pnpm --filter @afnizarnur/web build
# Check dist/ folder sizes
du -sh apps/web/dist/*
```

**2. Optimize images:**
- Use Astro's built-in image optimization
- Serve WebP format
- Use appropriate sizes

**3. Use client directives sparingly:**
```astro
<!-- Only hydrate when necessary -->
<Component client:idle />
<Component client:visible />
```

**4. Check Core Web Vitals:**
- Use Lighthouse in Chrome DevTools
- Aim for:
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1

## Getting Additional Help

### Documentation

- [Architecture Overview](./architecture.md)
- [Development Workflow](./development-workflow.md)
- [Content Management](./content-management.md)
- [Design System](./design-system.md)

### External Resources

- [Astro Documentation](https://docs.astro.build)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [pnpm Documentation](https://pnpm.io/)

### Community Support

- Astro Discord: https://astro.build/chat
- Sanity Slack: https://slack.sanity.io/
- GitHub Issues: Create issue in repository

### Debugging Tips

**General Debugging Process:**

1. **Read the error message carefully**
   - Note exact error text
   - Look for file paths and line numbers

2. **Check recent changes**
   - What did you change last?
   - Can you reproduce after reverting?

3. **Search for similar issues**
   - Google the error message
   - Check GitHub issues
   - Search Stack Overflow

4. **Test in isolation**
   - Create minimal reproduction
   - Remove unrelated code
   - Test one thing at a time

5. **Ask for help**
   - Provide error messages
   - Share relevant code
   - Describe steps to reproduce
   - Mention what you've tried

**Useful Debugging Commands:**

```bash
# Check versions
node --version
pnpm --version
pnpm list

# View logs
pnpm --filter @afnizarnur/web dev 2>&1 | tee debug.log

# Verbose output
pnpm --filter @afnizarnur/web build --verbose

# Check environment
env | grep SANITY
env | grep PUBLIC
```
