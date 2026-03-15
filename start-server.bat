@echo off
title Vichaar Studio - Local Dev Server
echo.
echo ==========================================
echo    Vichaar Studio - Starting Server...
echo ==========================================
echo.

:: Change to the directory where this .bat file is located
cd /d "%~dp0"

:: Check if node is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed. 
    echo Please install it from https://nodejs.org/
    echo.
    pause
    exit /b
)

echo  Server is starting at http://localhost:3000
echo  Opening your browser in 3 seconds...
echo.
echo  Press Ctrl+C to stop the server.
echo ==========================================
echo.

:: Wait 3 seconds then open the browser
timeout /t 3 /nobreak >nul
start http://localhost:3000

:: Start the serve command
npx serve . -l 3000

pause
