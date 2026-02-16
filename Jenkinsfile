pipeline {
  agent any

  options {
    timestamps()
  }

  environment {
    CI = 'true'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        bat 'node -v'
        bat 'npm -v'
        bat 'npm ci'
      }
    }

    stage('Run API tests') {
      steps {
        bat 'npx playwright test'
      }
    }
  }

  post {
    always {
      // JUnit (precisa do reporter junit no playwright.config.ts)
      junit testResults: 'test-results/junit.xml', allowEmptyResults: true

      // Arquiva relatórios/artefatos
      archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true
    }
  }
}
