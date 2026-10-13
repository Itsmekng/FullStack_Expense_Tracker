
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo 'Source code checked out successfully'
            }
        }

        stage('Check Node.js') {
            steps {
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Inspect Project') {
            steps {
                sh 'pwd'
                sh 'ls -la'
                sh 'test -f package.json'
            }
        }
    }
}
