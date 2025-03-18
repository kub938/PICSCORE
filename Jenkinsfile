pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "rublin322/picscore-frontend:latest"
        BACKEND_IMAGE  = "rublin322/picscore-backend:latest"
        DEPLOY_HOST = "ubuntu@j12b104.p.ssafy.io"
        DEPLOY_PATH = "/home/ubuntu/picscore"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    echo "현재 브랜치: ${env.BRANCH_NAME}"
                    echo "현재 워크스페이스: ${env.WORKSPACE}"
                    // def deployBranches = ['master', 'develop']
                    // if (!deployBranches.contains(env.BRANCH_NAME)) {
                    //     error "현재 브랜치(${env.BRANCH_NAME})에서는 배포를 수행하지 않습니다."
                    // }
                }
            }
        }
        stage('Prepare Environment') {
            steps {
                withCredentials([file(credentialsId: 'env-file-content', variable: 'ENV_FILE_PATH')]) {
                    script {
                        def envContent = readFile(ENV_FILE_PATH)
                        writeFile file: '.env', text: envContent
                    }
                }
            }
        }
        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend') {
                    sh "docker build -t ${FRONTEND_IMAGE} ."
                }
            }
        }
        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    sh "docker build -t ${BACKEND_IMAGE} ."
                }
            }
        }
        stage('Push Docker Images') {
            steps {
                withDockerRegistry([credentialsId: 'dockerhub-token', url: '']) {
                    sh "docker push ${FRONTEND_IMAGE}"
                    sh "docker push ${BACKEND_IMAGE}"
                }
            }
        }
        stage('Deploy to EC2') {
            steps {
                sshagent(credentials: ['ec2-ssh-key']) {
                    sh "scp -o StrictHostKeyChecking=no .env ${DEPLOY_HOST}:${DEPLOY_PATH}/.env"
                    sh "scp -o StrictHostKeyChecking=no docker-compose.yml ${DEPLOY_HOST}:${DEPLOY_PATH}/docker-compose.yml"
                    sh "scp -o StrictHostKeyChecking=no docker-compose.prod.yml ${DEPLOY_HOST}:${DEPLOY_PATH}/docker-compose.prod.yml"
                    sh "scp -o StrictHostKeyChecking=no ./nginx/nginx.prod.conf ${DEPLOY_HOST}:${DEPLOY_PATH}/nginx/nginx.prod.conf"
                    sh """
                    ssh -o StrictHostKeyChecking=no ${DEPLOY_HOST} '
                        cd ${DEPLOY_PATH} &&
                        docker compose down --remove-orphans &&
                        docker compose pull &&
                        docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d &&
                        docker image prune -f &&
                        docker volume prune -f
                    '
                    """
                }
            }
        }
    }
    
    post {
        always {
            echo '배포 파이프라인 종료'
        }
    }
}