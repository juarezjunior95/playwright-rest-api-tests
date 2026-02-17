pipeline {
  agent any

  options {
    timestamps()
  }

  environment {
    CI = 'true'
    // Ajuste se quiser trocar baseURL sem mexer no código
    BASE_URL = 'https://jsonplaceholder.typicode.com'
  }

  stages {
    stage('Checkout') {
      steps {
        // Checkout explícito (mais previsível no Windows)
        git branch: 'main', url: 'https://github.com/juarezjunior95/playwright-rest-api-tests.git'
      }
    }

    stage('Env debug') {
      steps {
        bat 'echo ===== WHOAMI ====='
        bat 'whoami'
        bat 'echo ===== PATH ====='
        bat 'echo %PATH%'
        bat 'echo ===== WHERE NODE/NPM ====='
        bat 'where node || echo "node not found in PATH"'
        bat 'where npm  || echo "npm not found in PATH"'
        bat 'where npx  || echo "npx not found in PATH"'
      }
    }

    stage('Install') {
      steps {
        // node -v pode falhar se Node não estiver no PATH do serviço Jenkins
        bat 'node -v'

        // Use npm.cmd para evitar bloqueio de npm.ps1 no PowerShell
        bat 'npm.cmd -v'

        // Se existir package-lock.json, use npm ci (ideal pra CI)
        // Se não existir, faz npm install e avisa
        bat '''
          if exist package-lock.json (
            echo Using npm ci...
            npm.cmd ci
          ) else (
            echo WARNING: package-lock.json not found. Falling back to npm install...
            npm.cmd install
          )
        '''
      }
    }

    stage('Run API tests') {
      steps {
        // Rode os testes (use BASE_URL do env se seu config ler process.env.BASE_URL)
        bat 'npx.cmd playwright test'
      }
    }
  }

  post {
    always {
      // Publica resultados JUnit se existirem (precisa reporter junit no playwright.config.ts)
      junit testResults: 'test-results/junit.xml', allowEmptyResults: true

      // Guarda report html + resultados
      archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true
    }
  }
}
