pipeline {
  agent any

  options {
    timestamps()
    skipDefaultCheckout(true)
  }

  environment {
    CI = 'true'
    BASE_URL = 'https://jsonplaceholder.typicode.com'
    // CAMINHO COMPLETO para o Node.js no Windows
    NODE_HOME = 'C:\\Program Files\\nodejs'
    // Adiciona o Node.js ao PATH
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
        bat 'node --version || echo node not found'
        bat 'npm --version || echo npm not found'
        bat 'npx --version || echo npx not found'
      }
    }

    stage('Install') {
      steps {
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
      junit testResults: 'test-results/**/*.xml', allowEmptyResults: true
      archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true
    }
  }
}