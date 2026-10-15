
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
                sh 'pwd'
                sh 'ls -la'
                sh 'test -f Client/package.json'
                sh 'test -f Server/package.json'
                echo 'Client and Server package.json files found'
            }
        }
    }
}
