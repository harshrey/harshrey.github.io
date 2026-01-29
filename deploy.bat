@echo off
echo Preparing source index.html...
copy /Y index.source.html index.html >nul

echo Building site...
call npm run build

echo.
echo Cleaning old assets...
del /Q assets\index.*.js 2>nul

echo.
echo Copying new build to root...
xcopy dist\* . /E /Y /Q

echo.
echo Staging changes...
git add .

echo.
echo Ready to deploy! Run:
echo   git commit -m "your message"
echo   git push
