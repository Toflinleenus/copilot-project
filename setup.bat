@echo off
REM This script sets up and runs both the backend and frontend

echo ========================================
echo Library Management System - Setup
echo ========================================

echo.
echo Step 1: Starting Backend (Spring Boot)...
cd librarymanagementsystem
start "Backend - Library Management" cmd /c mvn spring-boot:run

echo Waiting for backend to start...
timeout /t 5

echo.
echo Step 2: Installing Frontend Dependencies...
cd ..\frontend
call npm install

echo.
echo Step 3: Starting Frontend (React)...
start "Frontend - Library Management" cmd /c npm start

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Backend will be available at: http://localhost:8085
echo Frontend will be available at: http://localhost:3000
echo.
echo Close this window when done.
