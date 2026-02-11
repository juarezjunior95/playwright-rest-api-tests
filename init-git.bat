@echo off
setlocal enabledelayedexpansion

set GIT=C:\Users\JuarezFranciscodaCru\Git\PortableGit\bin\git.exe
set PROJECT_DIR=C:\Users\JuarezFranciscodaCru\Documents\api_tests_pwright

echo ========================================
echo Configurando Git
echo ========================================
echo.

REM Verificar versão
echo Versao do Git:
%GIT% --version

echo.
echo Configurando git...
%GIT% config --global user.name "Developer"
%GIT% config --global user.email "dev@example.com"

echo.
echo Mudando para pasta do projeto...
cd /d %PROJECT_DIR%

echo.
echo Inicializando repositorio...
%GIT% init

echo.
echo Adicionando arquivos...
%GIT% add .

echo.
echo Fazendo primeiro commit...
%GIT% commit -m "Initial commit - Projeto de testes Playwright API"

echo.
echo ========================================
echo Repositorio criado com sucesso!
echo ========================================
echo.
echo Status:
%GIT% status

pause
