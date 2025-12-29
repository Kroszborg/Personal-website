# Spotify Integration Setup Guide

This guide will help you set up Spotify integration to display your currently playing or last played song on your portfolio.

## Step 1: Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click **Create an App**
3. Fill in the details:
   - **App Name**: My Portfolio
   - **App Description**: Portfolio website Spotify integration
   - **Redirect URI**: `http://localhost:3000/api/auth/callback/spotify`
4. Click **Create**
5. Copy your **Client ID** and **Client Secret**

## Step 2: Get Authorization Code

1. Replace `YOUR_CLIENT_ID` in the URL below with your actual Client ID
2. Visit this URL in your browser:

```
https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost:3000/api/auth/callback/spotify&scope=user-read-currently-playing%20user-read-recently-played
```

3. Authorize the app
4. You'll be redirected to `http://localhost:3000/api/auth/callback/spotify?code=XXXXX`
5. Copy the `code` value from the URL (everything after `code=`)

## Step 3: Get Refresh Token

1. Open a terminal and run this curl command (replace the placeholders):

```bash
curl -X POST https://accounts.spotify.com/api/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code" \
  -d "code=YOUR_AUTHORIZATION_CODE" \
  -d "redirect_uri=http://localhost:3000/api/auth/callback/spotify" \
  -d "client_id=2f33762b77ef4337b8b1972b9b307557" \
  -d "client_secret=53dc6ef2a50d4a51b782b080dabd4348"
```

2. The response will contain a `refresh_token`. Copy this value.

## Step 4: Update Environment Variables

Add these to your `.env` file:

```env
SPOTIFY_CLIENT_ID="your_client_id_here"
SPOTIFY_CLIENT_SECRET="your_client_secret_here"
SPOTIFY_REFRESH_TOKEN="your_refresh_token_here"
```

## Step 5: Restart Your Dev Server

```bash
npm run dev
```

## Testing

1. Play a song on Spotify
2. Visit your portfolio homepage
3. You should see the "Now Playing" card below your social links
4. If nothing is playing, it will show your last played song

## Troubleshooting

- **Not showing any song**: Make sure you've granted the correct scopes and your Spotify app has the redirect URI configured
- **Shows "Error"**: Check your environment variables are correctly set
- **Token expired**: The refresh token should automatically get a new access token, but if issues persist, regenerate your refresh token

## API Endpoints

- **Currently Playing**: `/api/spotify`
- **Coding Activity**: `/api/online`

Both endpoints are cached and refresh every 60 seconds.
