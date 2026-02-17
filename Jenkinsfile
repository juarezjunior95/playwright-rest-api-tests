pipeline {
  agent {
    docker {
      image 'node:22-bullseye'
      args '-u root:root'
    }
  }

  options { timestamps() }

  environment {
    CI = 'true'
    BASE_URL = 'https://jsonplaceholder.typicode.com'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Env debug') {
      steps {
        sh '''
          set -e
          echo "=== WHOAMI ==="
          whoami || true
          echo "=== NODE/NPM/NPX ==="
          node -v
          npm -v
          npx -v
        '''
      }
    }

    stage('Install') {
      steps {
        sh '''
          set -e
          if [ -f package-lock.json ]; then
            npm ci
          else
            echo "WARN: package-lock.json not found. Running npm install..."
            npm install
          fi
        '''
      }
    }

    stage('Run API tests') {
      steps {
        sh '''
          set -e
          npx playwright test
        '''
      }
    }
  }

  post {
    always {
      // Publica JUnit se existir
      junit testResults: 'test-results/junit.xml', allowEmptyResults: true

      // Arquiva relatórios/artefatos
      archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true

      // Publica HTML só se existir (evita quebrar o post)
      script {
        if (fileExists('playwright-report/index.html')) {
          publishHTML(target: [
            reportName: 'Playwright HTML Report',
            reportDir: 'playwright-report',
            reportFiles: 'index.html',
            keepAll: true,
            alwaysLinkToLastBuild: true,
            allowMissing: true
          ])
        } else {
          echo "Playwright HTML report not found (playwright-report/index.html)."
        }
      }
    }
  }
}
