# Anthony Obot Portfolio (React)

This portfolio has been migrated from static HTML/CSS/JS to a React + Vite app.

## Local development

```bash
npm install
npm run dev
```

Open the local URL printed in your terminal (usually `http://localhost:5173`).

## Build and preview

```bash
npm run build
npm run preview
```

## GitHub Pages deployment

Deployment is handled by GitHub Actions in:

- `.github/workflows/static.yml`

On each push to `main`, the workflow builds the app and deploys `dist/` to GitHub Pages.

## How to view what changed

```bash
git status
git diff
```

For a compact commit-ready summary:

```bash
git diff --stat
```
