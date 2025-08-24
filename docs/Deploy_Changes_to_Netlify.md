# Deploying Changes from Localhost to Netlify

This project uses Netlify to build and deploy the React app and serverless functions.

## 1) One-time setup (already done)
- Connect GitHub repo `CELPIP-WRITING-COACH` to Netlify
- Build command: `npm run build`
- Publish directory: `build`
- Environment variable: add `OPENAI_API_KEY` in Netlify → Site settings → Build & deploy → Environment → Environment variables

## 2) Local development with Functions (recommended)
Netlify Functions run on a different local port (8888). Use Netlify Dev to run the React app and Functions together.

```bash
# Install Netlify CLI (once)
npm install -D netlify-cli

# Start local dev with functions (from project root)
npx netlify dev
# App will be available at http://localhost:8888
```

The app calls the function at `/.netlify/functions/evaluate` automatically via the `/api/*` redirect.

## 3) Regular local development (UI only)
If you only work on UI and don't need the function locally:
```bash
npm start
# App on http://localhost:3000 or 3001
# AI feedback will not work unless the function is proxied via Netlify Dev
```

## 4) Make code changes
- Edit files in `src/` or `netlify/functions/`
- Commit your changes:
```bash
git add .
git commit -m "Describe your change"
```

## 5) Deploy to Netlify (CI/CD via GitHub)
Push to `main` branch:
```bash
git push origin main
```
Netlify will automatically build and deploy your site.

## 6) Verify deployment
- Netlify dashboard → Deploys → check latest build
- Open your site URL to confirm changes

## 7) Updating environment secrets
- For serverless functions, set secrets in Netlify as environment variables (e.g., `OPENAI_API_KEY`).
- Do NOT put secrets in `.env` with `REACT_APP_` prefix—they would be exposed to the browser.

## Troubleshooting
- If AI feedback fails locally, use `npx netlify dev` so functions run at port 8888
- If production AI fails, confirm `OPENAI_API_KEY` is set in Netlify and redeploy
- If build fails, run `npm ci && npm run build` locally to reproduce


