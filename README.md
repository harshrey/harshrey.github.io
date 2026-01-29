# harshrey.github.io

This is a minimalist personal website built with React, Vite, and Chakra UI, deployed via GitHub Pages.

## Features
- Bookshelf, blog, projects, and more
- Client-side routing with React Router
- Responsive and fast
- Separate configurations for local development and production

## Development

### Local Development

1. **Clone the repository:**
   ```sh
   git clone https://github.com/harshrey/harshrey.github.io.git
   cd harshrey.github.io
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the development server:**
   ```sh
   npm run dev
   ```
   The site will be available at `http://localhost:5173`

The development server uses a separate configuration optimized for local development, with features like:
- Hot Module Replacement (HMR)
- Source maps
- Development-specific routing
- Local environment variables

### Production Build (GitHub Pages)

When you push to the main branch, GitHub Actions will automatically:
1. Build the site with production settings
2. Deploy to GitHub Pages
3. Make it available at https://harshrey.github.io/

To test the production build locally:
```sh
npm run build
npm run preview
```
   npm run build
   ```
   The output will be in the `dist` folder.


5. **Deploy to GitHub Pages:**
   - Just push your changes to the `main` branch. GitHub Actions will automatically build and deploy your site to GitHub Pages.
       git add .
       git commit -m "Deploy: update source and dist for GitHub Pages"
       git push origin main
       ```
    - GitHub Pages will serve the site from the root of the `main` branch.

**Note:**
- For development, you can keep `dist` in `.gitignore` to avoid unnecessary commits.
- For deployment, always include `dist` in your commit so GitHub Pages can serve your site.

## Making Changes
- Edit files in the `src` folder for React components and pages.
- Update `vite.config.js` for build settings.
- Push changes to GitHub to update the live site.

## Requirements
- Node.js and npm

## License
MIT
# Updated 2026-01-29
