pipeline {
    agent any

    stages {
        stage('Clonar repositório') {
            steps {
                git branch: 'main', url: 'https://github.com/gidias1/Modulo-14.git'
            }
        }

        stage('Instalar dependências') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Executar testes de API') {
            steps {
                bat 'npx mocha test/sample.test.js'
            }
        }
    }
}


