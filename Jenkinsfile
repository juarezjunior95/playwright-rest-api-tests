pipeline {
  agent any

  options {
    timestamps()
    // evita o checkout automático para não duplicar, já que faremos checkout scm no stage
    skipDefaultCheckout(true)
  }

  environment {
    CI = 'true'
    BASE_URL = 'https://jsonplaceholder.typicode.com'
  }

  stages {
    stage('Checkout') {
      steps {
        // usa o SCM configurado no job (URL/branch/credentials)
        checkout scm
      }
    }

    stage('Env debug') {
      steps {
        bat 'echo ===== WHOAMI ====='
        bat 'whoami'
        bat 'echo ===== PATH ====='
        bat 'echo %PATH%'
        bat 'echo ===== WHERE NODE/NPM/NPX ====='
        bat 'where node || echo node not found in PATH'
        bat 'where npm  || echo npm not found in PATH'
        bat 'where npx  || echo npx not found in PATH'
      }
    }

    stage('Install') {
      steps {
        // Se falhar aqui, é problema de PATH do Node no Jenkins (serviço)
        bat 'node -v'

        // Use npm.cmd para evitar bloqueio do npm.ps1 no Windows/PowerShell
        bat 'npm.cmd -v'

        // Ideal para CI: npm ci (você tem package-lock.json no repo)
        bat 'npm.cmd ci'
      }
    }

    stage('Run API tests') {
      steps {
        bat 'npx.cmd playwright test'
      }
    }
  }

  post {
    always {
      junit testResults: 'test-results/junit.xml', allowEmptyResults: true
      archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true
    }
  }
}
