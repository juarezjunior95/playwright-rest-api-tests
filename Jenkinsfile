pipeline {
  agent any

  options {
    timestamps()
    // evita o checkout automático para não duplicar
    skipDefaultCheckout(true)
  }

  environment {
    CI = 'true'
    BASE_URL = 'https://jsonplaceholder.typicode.com'
    
    // CAMINHO CORRETO DO NODE.JS
    NODE_HOME = 'C:\\Program Files\\nodejs'
    
    // Adiciona Node.js ao PATH
    PATH = "${NODE_HOME};${env.PATH}"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Env debug') {
      steps {
        bat 'echo ===== WHOAMI ====='
        bat 'whoami'
        bat 'echo ===== PATH ====='
        bat 'echo %PATH%'
        bat 'echo ===== NODE VERSION ====='
        bat 'node --version'
        bat 'npm --version'
        bat 'npx --version'
      }
    }

    stage('Install') {
      steps {
        bat 'echo Instalando dependências...'
        bat 'npm.cmd ci'
      }
    }

    stage('Run API tests') {
      steps {
        bat 'echo Executando testes de API...'
        bat 'npx.cmd playwright test'
      }
    }
  }

  post {
    always {
      // Publicar resultados dos testes JUnit
      junit testResults: 'test-results/**/*.xml', allowEmptyResults: true
      
      // Arquivar relatórios HTML e artefatos
      archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true
      
      // Publicar relatório HTML - VERSÃO SIMPLIFICADA (sem parâmetros extras)
      publishHTML([
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        reportName: 'Relatório Playwright'
      ])
    }
    
    success {
      bat 'echo ✅ Todos os testes passaram!'
    }
    
    failure {
      bat 'echo ❌ Alguns testes falharam! Verifique o relatório.'
    }
  }
}