# Script para abrir Playwright Test UI

$nodeDir = "C:\Users\JuarezFranciscodaCru\NodeJs\node-v23.11.1-win-x64"
$projectDir = "C:\Users\JuarezFranciscodaCru\Documents\api_tests_pwright"

# Adicionar ao PATH
$env:PATH = "$nodeDir;$env:PATH"

# Mudar para pasta do projeto
Set-Location -Path $projectDir

Write-Host "========================================" -ForegroundColor Green
Write-Host "Playwright Test UI" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Rodar Playwright Test UI
& "$nodeDir\npx.cmd" playwright test --ui
