pipeline {
    agent any
    stages {
        stage('Build Frontend') {
            steps {
                sh 'docker-compose up -d frontend'
            }
        }
    }
}