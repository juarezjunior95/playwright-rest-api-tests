# 📚 Guia Git - Comandos Essenciais

## ✅ Status Atual

✓ Git configurado e inicializado  
✓ Primeiro commit feito (24 arquivos)  
✓ Branch: master  
✓ Repositório local: `C:\Users\JuarezFranciscodaCru\Documents\api_tests_pwright`  

---

## 🚀 Comandos Básicos

### Ver Status
```powershell
git status
```

### Ver Commits
```powershell
git log --oneline
```

### Adicionar Arquivos
```powershell
git add .              # Todos os arquivos
git add arquivo.txt    # Um arquivo específico
```

### Fazer Commit
```powershell
git commit -m "Mensagem do commit"
```

### Ver Diferenças
```powershell
git diff              # Mudanças não staged
git diff --staged     # Mudanças staged
```

---

## 🌳 Branches

### Ver Branches
```powershell
git branch            # Branches locais
git branch -a         # Todos (locais + remotos)
```

### Criar Branch
```powershell
git branch nova-feature
git checkout nova-feature
```

Ou tudo junto:
```powershell
git checkout -b nova-feature
```

### Mudar de Branch
```powershell
git checkout master
git switch master     # Alternativa mais nova
```

### Deletar Branch
```powershell
git branch -d nome-branch
```

---

## ☁️ GitHub (Quando Tiver Repositório Remoto)

### Adicionar Repositório Remoto
```powershell
git remote add origin https://github.com/usuario/api_tests_pwright.git
```

### Ver Repositórios Remotos
```powershell
git remote -v
```

### Push (Enviar)
```powershell
git push origin master          # Push da branch atual
git push origin nova-feature    # Push de outra branch
```

### Pull (Baixar)
```powershell
git pull origin master
```

### Clone (Clonar Repositório)
```powershell
git clone https://github.com/usuario/api_tests_pwright.git
```

---

## 🔄 Fluxo de Trabalho Comum

```powershell
# 1. Ver status
git status

# 2. Verificar mudanças
git diff

# 3. Adicionar arquivos
git add .

# 4. Verificar stage
git status

# 5. Fazer commit
git commit -m "Descrição clara das mudanças"

# 6. Ver histórico
git log --oneline

# 7. Push para remoto (quando tiver GitHub)
git push origin master
```

---

## 🎯 Boas Práticas

✅ **Mensagens de Commit Claras:**
```powershell
git commit -m "feat: Adiciona testes para comentários CRUD"
git commit -m "fix: Corrige erro no teste de Posts"
git commit -m "docs: Atualiza README com exemplos"
git commit -m "refactor: Reorganiza estrutura de testes"
```

✅ **Workflow com Branches:**
```powershell
git checkout -b feat/novos-testes
# ... fazer mudanças ...
git add .
git commit -m "feat: Adiciona testes para Users"
git checkout master
git merge feat/novos-testes
```

---

## 🐛 Desfazer Mudanças

### Desfazer Arquivo Específico
```powershell
git checkout -- arquivo.txt
```

### Desfazer Último Commit (não aplicado)
```powershell
git reset --soft HEAD~1
```

### Desfazer Último Commit (aplicado)
```powershell
git reset --hard HEAD~1
```

---

## 📝 Comandos Mais Usados

| Comando | O que faz |
|---------|-----------|
| `git status` | Ver status |
| `git add .` | Adicionar tudo |
| `git commit -m "msg"` | Fazer commit |
| `git push` | Enviar para GitHub |
| `git pull` | Baixar do GitHub |
| `git log` | Ver histórico |
| `git branch` | Ver branches |
| `git checkout -b` | Criar e mudar branch |
| `git merge` | Mesclar branches |
| `git reset --hard HEAD~1` | Desfazer commit |

---

## 🔗 Próximos Passos

1. **Criar repositório no GitHub:**
   - Acesse https://github.com/new
   - Nome: `api_tests_pwright`
   - Descrição: "Testes de API REST com Playwright"

2. **Conectar repositório remoto:**
   ```powershell
   git remote add origin https://github.com/SEU_USER/api_tests_pwright.git
   git branch -M main
   git push -u origin main
   ```

3. **Fazer novos commits:**
   ```powershell
   # Fazer mudanças nos testes
   git add .
   git commit -m "Descrição das mudanças"
   git push
   ```

---

## 📞 Dicas Úteis

**Criar alias no PowerShell para comandos frequentes:**
```powershell
Set-Alias -Name gs -Value "git status"
Set-Alias -Name gc -Value "git commit"
Set-Alias -Name gp -Value "git push"
Set-Alias -Name gl -Value "git log --oneline"
```

Adicione ao arquivo `$PROFILE` para ser permanente!

---

**Boa sorte com seu projeto! 🚀**
