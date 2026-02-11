@echo off
REM Script para rodar testes com Node.js portável

set NODE_PATH=C:\Users\JuarezFranciscodaCru\NodeJs\node-v23.11.1-win-x64

REM Adicionar ao PATH
set PATH=%NODE_PATH%;%PATH%

REM Ir para pasta do projeto
cd /d C:\Users\JuarezFranciscodaCru\Documents\api_tests_pwright

REM Executar testes
npx playwright test tests/crud/posts.test.ts --reporter=list

pause
