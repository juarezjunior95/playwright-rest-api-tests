# Script para rodar testes com Node.js portável

$nodeDir = "C:\Users\JuarezFranciscodaCru\NodeJs\node-v23.11.1-win-x64"
$projectDir = "C:\Users\JuarezFranciscodaCru\Documents\api_tests_pwright"

# Adicionar ao PATH
$env:PATH = "$nodeDir;$env:PATH"

# Criar aliases
Set-Alias -Name npm -Value "$nodeDir\npm.cmd" -Force
Set-Alias -Name npx -Value "$nodeDir\npx.cmd" -Force
Set-Alias -Name node -Value "$nodeDir\node.exe" -Force

# Mudar para pasta do projeto
Set-Location -Path $projectDir

Write-Host "========================================" -ForegroundColor Green
Write-Host "Testes de API REST - Playwright" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Node.js: $(node --version)" -ForegroundColor Cyan
Write-Host "npm: $(npm --version)" -ForegroundColor Cyan
Write-Host ""

# Rodar testes
Write-Host "Rodando testes CRUD de Posts..." -ForegroundColor Yellow
Write-Host ""

& npm test tests/crud/posts.test.ts

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Testes finalizados!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
