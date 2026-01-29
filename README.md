# harshrey.github.io

Personal website built with React, Vite, and Chakra UI.

## Setup on New Machine

```sh
# 1. Install Node.js (if not installed)
winget install OpenJS.NodeJS.LTS

# 2. Clone repo
git clone https://github.com/harshrey/harshrey.github.io.git
cd harshrey.github.io

# 3. Install dependencies
npm install
```

## Development

```sh
npm run dev      # Start local dev server at http://localhost:5173
```

## Deploy Changes

After editing files in `src/`:

```sh
.\deploy.bat     # Build and prepare for deploy
git commit -m "your message"
git push
```

Or manually:
```sh
npm run build
xcopy dist\* . /E /Y
git add . && git commit -m "message" && git push
```

## Project Structure

```
src/
  ├── main.jsx          # App entry point
  ├── App.jsx           # Main app with routing & Home page
  ├── components/       # Reusable components
  │   └── Bookshelf.jsx
  └── pages/            # Page components
      ├── About.jsx
      └── Blog.jsx
assets/                 # Built files (auto-generated)
public/                 # Static files
```

## Editing Content

- **Home (terminal UI):** Edit `src/App.jsx` → `Home` component
- **About page:** Edit `src/pages/About.jsx`
- **Blog posts:** Edit `src/pages/Blog.jsx`
- **Bookshelf:** Edit `src/components/Bookshelf.jsx`
- **Navigation:** Edit `src/App.jsx` → `Nav` component
