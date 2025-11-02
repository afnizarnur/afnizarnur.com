# PlayStation Network (PSN) API Setup Guide

This guide walks you through setting up PlayStation Network API integration for the Recent Games widget.

## Overview

The PSN integration displays your most recently played PlayStation games in the CurrentActivity widget. It uses the unofficial PSN API via the `psn-api` npm package.

## Prerequisites

- A PlayStation Network account
- Access to a web browser with Developer Tools
- Node.js environment for running setup scripts

## Step 1: Get Your NPSSO Token

The NPSSO (Network Platform Single Sign-On) token is required to authenticate with the PSN API.

### Method 1: Browser Developer Tools (Recommended)

1. **Open PlayStation.com in your browser**
   - Navigate to https://www.playstation.com/
   - Make sure you're logged out

2. **Open Developer Tools**
   - Chrome/Edge: Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
   - Firefox: Press `F12` or `Ctrl+Shift+K` (Windows) / `Cmd+Option+K` (Mac)
   - Safari: Enable Developer menu in Preferences > Advanced, then press `Cmd+Option+I`

3. **Go to the Application/Storage tab**
   - Chrome/Edge: Click "Application" tab → "Cookies" → "https://www.playstation.com"
   - Firefox: Click "Storage" tab → "Cookies" → "https://www.playstation.com"
   - Safari: Click "Storage" tab → "Cookies" → "www.playstation.com"

4. **Log in to your PlayStation account**
   - Click the "Sign In" button on PlayStation.com
   - Complete the login process

5. **Find the NPSSO cookie**
   - In the cookies list, look for a cookie named `npsso`
   - Copy the **Value** field (it will be a long string like `abc123...xyz789`)
   - This is your NPSSO token!

   **Important Notes:**
   - The NPSSO token is valid for approximately 2 months
   - Keep this token secure and never share it publicly
   - You'll need to repeat this process when the token expires

### Method 2: Using psn-api CLI (Alternative)

If you prefer a command-line approach:

```bash
# Install psn-api globally
npm install -g psn-api

# Run the authentication flow
psn-api auth
```

This will open a browser and guide you through the authentication process.

## Step 2: Add Environment Variables

1. **Create or edit your `.env.local` file** in `apps/site/`:

```env
# PlayStation Network Integration
PSN_NPSSO_TOKEN=your_npsso_token_here
```

2. **Optional: Add Refresh Token** (for long-term use)

Once you have your NPSSO token, you can exchange it for a refresh token that lasts longer:

```typescript
// Run this script once to get your refresh token
import { exchangeNpssoForAccessCode, exchangeAccessCodeForAuthTokens } from "psn-api"

const npsso = "YOUR_NPSSO_TOKEN"

async function getRefreshToken() {
    const accessCode = await exchangeNpssoForAccessCode(npsso)
    const authorization = await exchangeAccessCodeForAuthTokens(accessCode)

    console.log("Refresh Token:", authorization.refreshToken)
    console.log("Expires in:", authorization.refreshTokenExpiresIn, "seconds")
}

getRefreshToken()
```

Add the refresh token to your `.env.local`:

```env
# Use refresh token instead of NPSSO for longer validity
PSN_REFRESH_TOKEN=your_refresh_token_here
```

**Note:** The client will automatically try to use `PSN_REFRESH_TOKEN` first, then fall back to `PSN_NPSSO_TOKEN`.

## Step 3: Verify Your Setup

1. **Start the development server:**

```bash
pnpm dev
```

2. **Check the Recent Games widget:**
   - Navigate to your local site (http://localhost:3000)
   - Open the CurrentActivity widget
   - Switch to "Games" mode using the toggle button
   - You should see your most recently played game!

3. **Check for errors:**
   - Open your browser's console (F12)
   - Look for any PSN API errors
   - Check the terminal for server-side errors

## Troubleshooting

### "Missing PSN credentials" error

**Problem:** The application can't find your NPSSO or refresh token.

**Solution:**
1. Verify `.env.local` file exists in `apps/site/`
2. Ensure the variable name is exactly `PSN_NPSSO_TOKEN` or `PSN_REFRESH_TOKEN`
3. Restart the development server after adding environment variables

### "Failed to authenticate with PSN" error

**Problem:** Your NPSSO token is invalid or expired.

**Solution:**
1. NPSSO tokens expire after ~2 months
2. Get a fresh NPSSO token following Step 1
3. Update your `.env.local` file with the new token
4. Restart the development server

### No games showing / "No recent games"

**Problem:** The API can't find any recently played games.

**Solutions:**
1. Verify you've played games recently on your PlayStation account
2. Check that your PlayStation privacy settings allow game activity to be visible
3. Try playing a game on your PlayStation and wait a few minutes for it to sync

### CORS or network errors

**Problem:** Browser blocking requests to PSN API.

**Solution:**
- The PSN API calls are made server-side (in the API route), so CORS shouldn't be an issue
- If you see CORS errors, check that you're making requests to `/api/psn/recent-games`, not directly to PSN
- Verify the API route file exists at `apps/site/app/api/psn/recent-games/route.ts`

## Privacy & Security

### What data is accessed?

The PSN integration only accesses:
- Your recently played games list
- Game names and icons
- Last played timestamps
- Platform information (PS4, PS5, etc.)

It does **not** access:
- Your PlayStation Store purchases
- Payment information
- Friends list
- Messages or chats
- Trophy details (unless you extend the implementation)

### Is my NPSSO token secure?

- ✅ The NPSSO token is stored only in **environment variables** on your server
- ✅ It's **never** sent to the client/browser
- ✅ API calls are made **server-side only** (marked with `"server-only"` import)
- ⚠️ Keep your `.env.local` file out of version control (it's in `.gitignore`)
- ⚠️ Never commit your NPSSO or refresh token to a public repository

### Production Deployment

For production deployment (e.g., Netlify, Vercel):

1. **Add environment variables to your hosting platform:**
   - Go to your project settings
   - Add `PSN_NPSSO_TOKEN` or `PSN_REFRESH_TOKEN`
   - Deploy your application

2. **Rotate tokens regularly:**
   - Set a reminder to refresh your NPSSO token every 2 months
   - Consider implementing automatic token refresh logic

## API Rate Limits

The PSN API has undocumented rate limits. To avoid issues:

- The implementation uses **5-minute ISR caching** at the API route level
- Client-side data is cached in **localStorage for 10 minutes**
- Automatic polling happens **every 5 minutes**
- Total API calls: ~12 per hour per user maximum

This should be well within any reasonable rate limits.

## Further Reading

- **psn-api Documentation:** https://github.com/achievements-app/psn-api
- **PSN API Endpoints:** https://psn-api.achievements.app/
- **Authentication Guide:** https://github.com/achievements-app/psn-api/blob/main/website/docs/authentication/authenticating-manually.md

## Support

If you encounter issues not covered in this guide:

1. Check the psn-api GitHub issues: https://github.com/achievements-app/psn-api/issues
2. Verify your PlayStation account is in good standing
3. Try using a fresh NPSSO token
4. Check the browser console and server logs for detailed error messages
