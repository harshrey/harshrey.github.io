# harshrey.github.io

Personal website built with React, Vite, and Chakra UI.

## Setup on New Machine

```powershell
# 1. Clone repo
git clone https://github.com/harshrey/harshrey.github.io.git
cd harshrey.github.io

# 2. One-command setup (installs Volta if needed, pins Node, installs deps)
npm run setup
```

This repo is pinned to Node via `package.json` (`volta.node`), so it won't collide with other projects.

If Node is already set up and you only need deps:

```powershell
npm run setup:quick
```

## Development (Preview Locally)

```powershell
npm run dev
```
Then open http://localhost:5173 in your browser.

Easiest local run (setup + open browser + start dev server):

```powershell
npm run local
```

This command also restores `index.html` from `index.source.html` so Vite always runs against source files.

Check local server status:

```powershell
npm run local:status
```

Quick checks:

```powershell
node -v
npm -v
npm run build
```

## Deploy to GitHub Pages

After making changes to files in `src/`:

```powershell
# 1. Build the project
npm run build

# 2. Copy built files to root (GitHub Pages serves from root)
Copy-Item -Path "dist\*" -Destination "." -Recurse -Force

# 3. Commit and push
git add -A
git commit -m "Your commit message here"
git push
```

Wait 1-2 minutes for GitHub Pages to rebuild, then check https://harshrey.github.io

## Project Structure

```
src/
  ├── main.jsx          # App entry point
  ├── App.jsx           # Main app with routing & Home terminal UI
  ├── components/
  │   └── Bookshelf.jsx
  └── pages/
      ├── About.jsx
      ├── Blog.jsx
      └── Paintings.jsx
public/
  └── assets/
      └── paintings/    # Your painting images (1.jpg, 2.jpg, etc.)
assets/                 # Built files (auto-generated, don't edit)
```

## Editing Content

- **Home (terminal UI):** Edit `src/App.jsx` → `Home` component and `COMMANDS` object
- **About page:** Edit `src/pages/About.jsx`
- **Blog posts:** Edit `src/pages/Blog.jsx` → `BLOG_POSTS` array
- **Bookshelf:** Edit `src/components/Bookshelf.jsx`
- **Paintings:** Edit `src/pages/Paintings.jsx` → `PAINTINGS` array
- **Navigation:** Edit `src/App.jsx` → `Nav` component

## Adding New Paintings

1. Add your image to `public/assets/paintings/` (name it `5.jpg`, `6.jpg`, etc.)
2. Edit `src/pages/Paintings.jsx` and add to the `PAINTINGS` array:
   ```jsx
   { id: 5, image: "/assets/paintings/5.jpg", position: "center", zoom: 1 },
   ```
3. Build and deploy (see above)
