#!/bin/bash or cmd.exe
REM ===================================================
REM Script para rodar Testes Playwright - Posts CRUD
REM ===================================================

@echo off
setlocal enabledelayedexpansion

set NODE_DIR=C:\Users\JuarezFranciscodaCru\NodeJs\node-v23.11.1-win-x64
set PROJECT_DIR=C:\Users\JuarezFranciscodaCru\Documents\api_tests_pwright

echo ========================================
echo Testes de API REST - Playwright
echo ========================================
echo.
echo Rodando testes CRUD de Posts...
echo.

cd /d %PROJECT_DIR%
"%NODE_DIR%\npx.cmd" playwright test tests/crud/posts.test.ts --reporter=html

echo.
echo ========================================
echo Testes finalizados!
echo Relatório HTML: test-results
echo ========================================

pause
