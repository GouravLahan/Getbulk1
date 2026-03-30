# GetBulk - Supabase Quick Start Guide

To resolve the "Mock Mode" warning and enable real data persistence, follow these simple steps to set up your Supabase project.

## 1. Create a Project
1.  Go to [Supabase.com](https://supabase.com) and sign in/up.
2.  Create a **New Project**.
3.  Wait for the project to provision (usually takes about 1-2 minutes).

## 2. Get Your API Keys
1.  In your Supabase Dashboard, go to **Project Settings** > **API**.
2.  Copy the following values:
    -   **Project URL**: e.g., `https://your-project.supabase.co`
    -   **Project API anon key**: e.g., `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## 3. Update Environment Variables
Open your [.env.local](file:///d:/GetBulk/.env.local) file and paste the values:
```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

## 4. Run the Schema
1.  Go to the **SQL Editor** in your Supabase Dashboard.
2.  Click **"New Query"**.
3.  Paste the contents of [supabase_schema.sql](file:///d:/GetBulk/supabase_schema.sql) into the editor.
4.  Click **Run**.

## 5. Verify
Restart your development server:
```bash
npm run dev
```
The yellow "Mock Mode" warning at the top of the dashboard should now be gone!

---

> [!TIP]
> **Need help with the keys?** You can paste your **Project URL** and **Anon Key** in the chat, and I'll update the configuration for you for an instant fix.
