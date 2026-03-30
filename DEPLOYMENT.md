# GetBulk: Netlify Production Deployment Guide

This document serves as the "System Command" for taking your local code live on Netlify. It ensures that the **Elite Aesthetic** and **Data Integrity** are preserved in a production environment.

## 1. Prerequisites (Site Prep)
- Ensure all latest changes from our session are committed and pushed to your **GitHub** repository.
- Verify that [netlify.toml](file:///d:/GetBulk/netlify.toml) exists in the root directory.

## 2. Connect GitHub to Netlify
1.  Navigate to your [Netlify Dashboard](https://app.netlify.com).
2.  Click **"Add new site"** > **"Import an existing project"**.
3.  Choose **GitHub** and select your `GetBulk` repository.
4.  Accept the default build settings:
    - **Build command**: `npm run build`
    - **Publish directory**: `.next`

## 3. Critical Environment Variables
For your Clerk Auth and Supabase DB to work, you **MUST** add these keys in **Site Settings > Environment Variables**:

| Variable Key | Get the Value From |
| :--- | :--- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Your [.env.local](file:///d:/GetBulk/.env.local) line 2 |
| `CLERK_SECRET_KEY` | Your [.env.local](file:///d:/GetBulk/.env.local) line 3 |
| `NEXT_PUBLIC_SUPABASE_URL` | Your [.env.local](file:///d:/GetBulk/.env.local) line 7 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your [.env.local](file:///d:/GetBulk/.env.local) line 8 |
| `NEXT_PUBLIC_SITE_URL` | Your Netlify Site URL (Ex: `https://getbulk.netlify.app`) |

## 4. Post-Deployment Optimization
- **Asset Check**: Verify that `public/images/centered_athlete.png` and `public/images/gourav_lahan.png` load correctly on the live site.
- **Form Integrity**: Perform one "Start Training" session to confirm Supabase is correctly persisting data on the live URL.

## 5. Support & Growth
- **Founder**: Gourav Lahan
- **HQ**: Assam, India
- **Email**: Gauravgetbulk@gmail.com

**GetBulk Production Status: READY FOR LAUNCH.**
