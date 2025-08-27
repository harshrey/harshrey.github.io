# harshrey.github.io

This is a minimalist personal website built with React, Vite, and Chakra UI, deployed via GitHub Pages.

## Features
- Bookshelf, blog, projects, and more
- Client-side routing with React Router
- Responsive and fast

## Getting Started

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
   The site will be available at `http://localhost:5173`.

4. **Build for production:**
   ```sh
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
