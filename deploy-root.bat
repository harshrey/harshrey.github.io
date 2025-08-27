@echo off
REM Build and deploy Vite output to repo root for GitHub Pages
npm run build
xcopy dist\*.* . /E /Y /Q
REM Stage and commit all changes
git add .
git commit -m "deploy: update root files with latest Vite build"
git push origin main
