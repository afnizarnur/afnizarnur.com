# Netlify Deployment Guide

This guide covers the deployment workflow for the portfolio monorepo, aligning with User Story 5 requirements in `specs/001-portfolio-monorepo-infrastructure/spec.md`.

## 1. Link Repository to Netlify (T089)

1. Sign in at <https://app.netlify.com> and choose **Add new site → Import an existing project**.
2. Select GitHub, authorize if prompted, and pick the `afnizarnur/afnizarnur.com` repository.
3. Keep the default base directory (root of the repo). Netlify will detect the workspace thanks to the `packageManager` field in `package.json`.

> **Tip**: Netlify automatically enables pnpm when the root `package.json` specifies `"packageManager": "pnpm@…"`.

## 2. Configure Build Settings (T090)

- **Build command**: `pnpm turbo run build --filter=@afnizarnur/web`
- **Publish directory**: `apps/site/dist`
- **Base directory**: leave empty (Netlify clones to repo root)

These values are also codified in `netlify.toml`, so future deploy contexts inherit them automatically.

## 3. Environment Variables (T091)

Add the following variables in **Site settings → Build & deploy → Environment**:

| Variable                        | Example                  | Description                              |
| ------------------------------- | ------------------------ | ---------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `abcd1234`               | Sanity project ID used by both apps      |
| `NEXT_PUBLIC_SANITY_DATASET`    | `production`             | Dataset that Next.js queries             |
| `PUBLIC_SITE_URL`               | `https://afnizarnur.com` | Absolute site URL for sitemap/open graph |

> Update values in the Netlify UI; the defaults in `netlify.toml` are placeholders only.

## 4. First Production Deploy (T092)

1. Trigger a manual deploy from the Netlify dashboard (`Deploys → Trigger deploy → Deploy site`).
2. Wait for the build to finish (should take <5 minutes per `spec.md` SC-004).
3. Verify the published site loads, navigation works, and dynamic content renders from Sanity.

## 5. Custom Domain & HTTPS (T093)

1. Go to **Site settings → Domain management** and add `afnizarnur.com` (or desired domain).
2. Update DNS records with Netlify’s `CNAME` (for `www`) and `A`/`ALIAS` (for apex) records.
3. Once DNS propagates, enable the free Netlify certificate (Let’s Encrypt). Confirm HTTPS is forced.

## 6. Automate Deploys with Sanity Webhooks (T094–T097)

1. **Create Netlify Build Hook**
    - `Site settings → Build & deploy → Build hooks → Add build hook`.
    - Name it `sanity-publish` and copy the generated URL.
2. **Configure Sanity Webhook**
    - In the Sanity project dashboard, open **Project settings → API → Webhooks**.
    - Create a webhook pointing to the Netlify build hook URL.
    - Events: enable `Create`, `Update`, `Delete`, `Publish`, and `Unpublish` for all document types.
    - Ensure “HTTP POST” and “Status code 2XX indicates success” are selected.
3. **Test the Hook**
    - Publish a draft document in Studio and watch for a new deploy in Netlify.
    - Confirm `Deploy log` shows a `Hook triggered by Sanity` entry.

## 7. Resilience Testing (T098–T099)

### 7.1 Simulate Webhook Failure

1. Temporarily disable the Netlify build hook (toggle “Disable” in the UI).
2. Publish content in Sanity — verify the document still saves successfully.
3. Re-enable the hook immediately after the test.

### 7.2 Verify Retry Behaviour

1. Publish another document while the hook is enabled.
2. Check Netlify deploy logs for automatic retries (Netlify retries failing builds up to three times).
3. Note the timestamp and status in case troubleshooting is needed later.

## 8. Manual Recovery & Troubleshooting (T100)

- **Manual build trigger**: Use `Deploys → Trigger deploy → Deploy site` when the webhook fails or content must go live immediately.
- **Webhook status**: `Deploys → Triggered deploys` lists builds started by hooks; confirm the source is "Hook" and the hook name matches (`sanity-publish`).
- **Sanity logs**: In the webhook configuration, enable "Log deliveries" to inspect the last payload and response.
- **Netlify notifications**: Configure email/slack notifications for failed deploys in **Team settings → Notifications**.

Document the outcome of these tests in project notes so the automation remains auditable.
