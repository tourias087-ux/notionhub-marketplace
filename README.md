# NotionHub Marketplace — Setup & Run

Prerequisites
- Node.js (recommended 18.x or later)
- npm (comes with Node) or yarn
- Git (for version control / deployments)
- (Optional) A Notion integration token and database id if the project reads from Notion

Quick start
1. Create the project folder and copy the source files into it:
   ```bash
   mkdir notionhub-marketplace
   # copy files into notionhub-marketplace
   cd notionhub-marketplace
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

Environment variables
1. Copy the example env to a working .env file:
   ```bash
   cp .env.example .env
   ```
2. Edit `.env` and fill in real values (see `.env.example` for placeholders). Typical variables the app may need:
   - NOTION_API_KEY — your Notion integration secret
   - NOTION_DATABASE_ID — the Notion DB id the app reads
   - NODE_ENV — development or production
   - PORT — local port (optional)
   - DATABASE_URL — if the app uses a database (Postgres, etc.)
   - NEXT_PUBLIC_* — public variables for Next.js if used

Run locally
- If the project is a Next.js app:
  ```bash
  npm run dev
  # opens on http://localhost:3000 by default
  ```
- If it's a generic Node app (check package.json for scripts):
  ```bash
  npm run dev
  npm run build
  npm start
  ```

Deploying
- Vercel (recommended for Next.js):
  1. Push the repository to GitHub, GitLab or Bitbucket.
  2. Import the project into Vercel (https://vercel.com/import).
  3. Add the same environment variables in the Vercel project settings.
  4. Deploy — Vercel auto-deploys on push.

Stripe Test Cards
- Success: 4242 4242 4242 4242
- Decline: 4000 0000 0000 0002

Troubleshooting
- "Cannot find module" or missing types: try removing node_modules and reinstalling:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
- Wrong Node version: use nvm to switch:
  ```bash
  nvm install 18
  nvm use 18
  ```
- Notion API errors: ensure NOTION_API_KEY and NOTION_DATABASE_ID are correct and integration has access to the database.
