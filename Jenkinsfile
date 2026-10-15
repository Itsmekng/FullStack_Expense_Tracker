
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
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
                sh 'ls -la Client'
                sh 'ls -la Server'
                sh 'test -d Client'
                sh 'test -f Server/package.json'
                echo 'Project structure verified'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('Server') {
                    sh 'npm install'
                }
            }
        }
    }
}
