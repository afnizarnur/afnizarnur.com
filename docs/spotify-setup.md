# Spotify Integration Setup Guide

This guide walks you through setting up the Spotify API integration for the Now Playing widget.

## Overview

The Now Playing widget displays your recently played Spotify track with:
- Real-time track information (title, artist, album art)
- Animated music visualizer
- 5-minute caching to minimize API calls
- Graceful fallback if API fails

## Prerequisites

- Spotify account (free or premium)
- Access to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)

## Step 1: Create Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click **"Create app"**
4. Fill in the app details:
   - **App name**: `afnizarnur.com Now Playing` (or your choice)
   - **App description**: `Personal website now playing widget`
   - **Redirect URI**: `http://localhost:3002/callback`
   - **API**: Select "Web API"
5. Accept the terms and click **"Save"**

**Note**: The script uses port 3002 by default. If you need to use a different port, set `SPOTIFY_AUTH_PORT` in your env file and update the redirect URI accordingly.

## Step 2: Get Client Credentials

1. In your app dashboard, click **"Settings"**
2. You'll see your:
   - **Client ID** - Copy this
   - **Client Secret** - Click "View client secret" and copy it

## Step 3: Configure Environment Variables

1. Open `apps/site/.env.local` or `apps/site/.env` (create it if it doesn't exist)
2. Add your credentials:

```bash
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
```

**Note**: The script supports both `.env` and `.env.local`. Use `.env.local` for local development (git-ignored) or `.env` if you prefer.

## Step 4: Get Refresh Token

Run the authorization script to get your refresh token:

```bash
cd apps/site
node scripts/spotify-auth.js
```

The script will:
1. Open your browser to Spotify's authorization page
2. Ask you to log in and authorize the app
3. Display your refresh token in the terminal

Copy the refresh token and add it to your `.env` or `.env.local`:

```bash
SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
```

## Step 5: Verify Setup

Your complete `.env` or `.env.local` should look like:

```bash
# Spotify Integration
SPOTIFY_CLIENT_ID=abc123...
SPOTIFY_CLIENT_SECRET=def456...
SPOTIFY_REFRESH_TOKEN=ghi789...
```

## Step 6: Test the Integration

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Visit the page with the Now Playing widget

3. You should see your most recently played track from Spotify

## How It Works

### Architecture

```
┌─────────────────┐
│ NowPlaying.tsx  │  Client component
│ (Browser)       │  Fetches data every 5 min
└────────┬────────┘
         │
         │ HTTP GET
         ▼
┌─────────────────────────────────┐
│ /api/spotify/now-playing        │  Next.js API Route
│ (Server)                        │  ISR: 5 min cache
└────────┬────────────────────────┘
         │
         │ Uses refresh token
         ▼
┌─────────────────────────────────┐
│ Spotify Web API                 │  External API
│ /me/player/recently-played      │  Recently played tracks
└─────────────────────────────────┘
```

### Caching Strategy

- **Server-side**: 5-minute ISR cache (Next.js)
- **CDN**: `s-maxage=300` (5 min) + `stale-while-revalidate=600` (10 min)
- **Client-side**: Polls API every 5 minutes

This means:
- API is called at most once per 5 minutes
- Users see cached data (fast response)
- No risk of hitting Spotify's rate limits

### API Endpoints Used

- `GET /v1/me/player/recently-played` - Fetches recently played tracks
- `POST /api/token` - Refreshes access token (automatic)

### Scopes Required

- `user-read-recently-played` - Read recently played tracks

## Troubleshooting

### "Missing Spotify credentials" error

- Check that all three env vars are set in `.env` or `.env.local`
- Make sure the file is in `apps/site/` directory
- Restart the dev server after adding env vars

### "Failed to refresh access token" error

- Your refresh token might be expired or invalid
- Re-run `node scripts/spotify-auth.js` to get a new one

### Widget shows default/fallback data

- Check browser console for errors
- Verify API endpoint: `http://localhost:3000/api/spotify/now-playing`
- Check that you've played music on Spotify recently

### "Authorization failed" when running auth script

- Verify the redirect URI in Spotify Dashboard matches exactly: `http://localhost:3002/callback`
- If you see "address already in use", change the port by setting `SPOTIFY_AUTH_PORT=3003` (or any available port) in your env file, and update the redirect URI in Spotify Dashboard
- Check that Client ID and Secret are correct

### "Address already in use" error

- Another process is using port 3002
- Set `SPOTIFY_AUTH_PORT` to a different port in your env file (e.g., `SPOTIFY_AUTH_PORT=3003`)
- Update the redirect URI in your Spotify app settings to match the new port
- Or kill the process using the port: `lsof -ti:3002 | xargs kill`

## Security Notes

- **Never commit** your `.env` or `.env.local` files to git
- Both `.env` and `.env.local` are already in `.gitignore`
- Environment variables are only accessible on the server (not exposed to client)
- Refresh tokens are long-lived - store them securely
- The API route runs server-side only (marked with `"server-only"`)

## Production Deployment

When deploying to Netlify:

1. Go to your site's **Settings** → **Environment variables**
2. Add the three Spotify environment variables:
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`
   - `SPOTIFY_REFRESH_TOKEN`
3. Trigger a new deployment

The integration will work automatically with no code changes.

## API Rate Limits

Spotify's rate limits are generous:
- Standard rate limit: ~180 requests per minute per user
- With our 5-minute cache: ~12 requests per hour
- You're unlikely to ever hit rate limits with this setup

## References

- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api)
- [Authorization Guide](https://developer.spotify.com/documentation/web-api/tutorials/code-flow)
- [Recently Played Endpoint](https://developer.spotify.com/documentation/web-api/reference/get-recently-played)
