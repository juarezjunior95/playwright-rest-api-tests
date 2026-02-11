# Script para configurar Git Portável

$gitDir = "C:\Users\JuarezFranciscodaCru\Git\PortableGit\bin"
$projectDir = "C:\Users\JuarezFranciscodaCru\Documents\api_tests_pwright"

# Adicionar ao PATH
$env:PATH = "$gitDir;$env:PATH"

Write-Host "========================================" -ForegroundColor Green
Write-Host "Configurando Git" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Verificar Git
Write-Host "Versão do Git:" -ForegroundColor Cyan
& git --version

Write-Host ""
Write-Host "Configure seu Git:" -ForegroundColor Yellow

# Configurar user name
$userName = Read-Host "Seu nome (ex: João Silva)"
git config --global user.name "$userName"

# Configurar user email
$userEmail = Read-Host "Seu email (ex: joao@email.com)"
git config --global user.email "$userEmail"

Write-Host ""
Write-Host "Configurações salvas:" -ForegroundColor Green
git config --list --global | grep user

Write-Host ""
Write-Host "Inicializando repositório Git..." -ForegroundColor Yellow
cd $projectDir
& git init

Write-Host ""
Write-Host "Repositório inicializado!" -ForegroundColor Green
Write-Host "Pasta: $projectDir" -ForegroundColor Cyan
Write-Host ""
