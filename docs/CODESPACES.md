# Git & Codespaces Push Instructions (iPad-friendly)

## Create a GitHub repo (web)
1. Create a new repo on https://github.com/new and copy the repo URL.

2. From Working Copy or a desktop:
   ```bash
   git init
   git add .
   git commit -m "chore: initial import NotionHub marketplace"
   git branch -M main
   git remote add origin https://github.com/your-user/notionhub-marketplace.git
   git push -u origin main
   ```

## Working Copy (iPad) — paste files from Notes and push
1. Install Working Copy from the App Store.
2. In Working Copy, tap + → Create Repository or Clone.
3. Add files (create folders as needed) and paste contents.
4. Stage → Commit → Push.

## Codespaces (recommended for full dev on iPad)
1. Create a codespace from the repo (GitHub → Code → Open with Codespaces).
2. In Codespace terminal:
   npm install
   cp .env.example .env.local
   edit .env.local with your keys
   npm run dev
3. Use the forwarded port preview to open the app.

## Deploy to Vercel
1. Import project to Vercel.
2. Add env vars: STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE, NOTION keys, NEXT_PUBLIC_SITE_URL.
3. Deploy.
