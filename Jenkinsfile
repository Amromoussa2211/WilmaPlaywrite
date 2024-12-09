pipeline {
    agent any
    environment {
        SLACK_WEBHOOK_URL = credentials('slack-webhook') // Jenkins credential for Slack
    }
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    try {
                        sh 'npx playwright test --reporter=line,allure-playwright'
                    } catch (Exception e) {
                        slackNotify('FAILURE', 'Tests failed. Check Jenkins logs for details.')
                        throw e
                    }
                }
            }
        }
        stage('Generate Allure Report') {
            steps {
                sh 'npx allure generate allure-results --clean -o allure-report'
                archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
            }
        }
    }
    post {
        always {
            junit '**/test-results/**/*.xml'
        }
        failure {
            script {
                sh 'node notify-slack.js FAILURE "Tests failed. Check Allure report for details."'
            }
        }
        success {
            script {
                sh 'node notify-slack.js SUCCESS "All tests passed successfully."'
            }
        }
    }
}
