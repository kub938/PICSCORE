pipeline {
    agent any

    environment {
        FRONTEND_IMAGE_DEV = "rublin322/picscore-frontend:develop"
        BACKEND_IMAGE_DEV = "rublin322/picscore-backend:develop"
        FRONTEND_IMAGE_PROD = "rublin322/picscore-frontend:latest"
        BACKEND_IMAGE_PROD = "rublin322/picscore-backend:latest"
        EC2_DEPLOY_HOST = "ubuntu@j12b104.p.ssafy.io"
        EC2_DEPLOY_PATH = "/home/ubuntu/picscore"
        GCP_DEPLOY_HOST = "rublin322@picscore.net"
        GCP_DEPLOY_PATH = "/home/rublin322/picscore"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    echo "현재 브랜치: ${env.BRANCH_NAME}"
                    echo "현재 워크스페이스: ${env.WORKSPACE}"
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

        stage('Build and Deploy') {
            parallel {
                stage('Develop Branch - EC2 Deployment') {
                    when {
                        branch 'develop'
                    }
                    stages {
                        stage('Build Docker Images - Dev') {
                            steps {
                                dir('frontend') {
                                    sh "docker build -t ${FRONTEND_IMAGE_DEV} ."
                                }
                                dir('backend') {
                                    sh "docker build -t ${BACKEND_IMAGE_DEV} ."
                                }
                            }
                        }
                        stage('Push to DockerHub') {
                            steps {
                                withDockerRegistry([credentialsId: 'dockerhub-token', url: '']) {
                                    sh "docker push ${FRONTEND_IMAGE_DEV}"
                                    sh "docker push ${BACKEND_IMAGE_DEV}"
                                }
                            }
                        }
                        stage('Deploy to EC2') {
                            steps {
                                sshagent(credentials: ['ec2-ssh-key']) {
                                    sh "scp -o StrictHostKeyChecking=no .env ${EC2_DEPLOY_HOST}:${EC2_DEPLOY_PATH}/.env"
                                    sh "scp -o StrictHostKeyChecking=no .env.front ${EC2_DEPLOY_HOST}:${EC2_DEPLOY_PATH}/.env.front"
                                    sh "scp -o StrictHostKeyChecking=no docker-compose.yml ${EC2_DEPLOY_HOST}:${EC2_DEPLOY_PATH}/docker-compose.yml"
                                    sh "scp -o StrictHostKeyChecking=no ./nginx.conf ${EC2_DEPLOY_HOST}:${EC2_DEPLOY_PATH}/nginx.conf"
                                    sh "scp -o StrictHostKeyChecking=no prometheus.yml ${EC2_DEPLOY_HOST}:${EC2_DEPLOY_PATH}/prometheus.yml"
                                    sh """
                                    ssh -o StrictHostKeyChecking=no ${EC2_DEPLOY_HOST} '
                                        cd ${EC2_DEPLOY_PATH} &&
                                        docker compose down --remove-orphans &&
                                        docker pull ${FRONTEND_IMAGE_DEV} &&
                                        docker pull ${BACKEND_IMAGE_DEV} &&
                                        export FRONTEND_IMAGE=${FRONTEND_IMAGE_DEV} &&
                                        export BACKEND_IMAGE=${BACKEND_IMAGE_DEV} &&
                                        docker compose up -d &&
                                        docker container prune -f &&
                                        docker image prune -f &&
                                        docker volume prune -f
                                    '
                                    """
                                }
                            }
                        }
                    }
                }

                stage('Master Branch - DockerHub & GCP Deployment') {
                    when {
                        branch 'infra/create-new-server'
                    }
                    stages {
                        stage('Build Docker Images - Prod') {
                            steps {
                                dir('frontend') {
                                    sh "docker build -t ${FRONTEND_IMAGE_PROD} ."
                                }
                                dir('backend') {
                                    sh "docker build -t ${BACKEND_IMAGE_PROD} ."
                                }
                            }
                        }
                        stage('Push to DockerHub') {
                            steps {
                                withDockerRegistry([credentialsId: 'dockerhub-token', url: '']) {
                                    sh "docker push ${FRONTEND_IMAGE_PROD}"
                                    sh "docker push ${BACKEND_IMAGE_PROD}"
                                }
                            }
                        }
                        stage('Deploy to GCP') {
                            steps {
                                sshagent(credentials: ['gcp-ssh-key']) {
                                    sh "scp -o StrictHostKeyChecking=no .env ${GCP_DEPLOY_HOST}:${GCP_DEPLOY_PATH}/.env"
                                    sh "scp -o StrictHostKeyChecking=no .env.front ${GCP_DEPLOY_HOST}:${GCP_DEPLOY_PATH}/.env.front"
                                    sh "scp -o StrictHostKeyChecking=no docker-compose.yml ${GCP_DEPLOY_HOST}:${GCP_DEPLOY_PATH}/docker-compose.yml"
                                    sh "scp -o StrictHostKeyChecking=no ./nginx.conf ${GCP_DEPLOY_HOST}:${GCP_DEPLOY_PATH}/nginx.conf"
                                    sh "scp -o StrictHostKeyChecking=no prometheus.yml ${GCP_DEPLOY_HOST}:${GCP_DEPLOY_PATH}/prometheus.yml"
                                    sh """
                                    ssh -o StrictHostKeyChecking=no ${GCP_DEPLOY_HOST} '
                                        cd ${GCP_DEPLOY_PATH} &&
                                        docker compose down --remove-orphans &&
                                        docker pull ${FRONTEND_IMAGE_PROD} &&
                                        docker pull ${BACKEND_IMAGE_PROD} &&
                                        export FRONTEND_IMAGE=${FRONTEND_IMAGE_PROD} &&
                                        export BACKEND_IMAGE=${BACKEND_IMAGE_PROD} &&
                                        docker compose up -d &&
                                        docker container prune -f &&
                                        docker image prune -f &&
                                        docker volume prune -f
                                    '
                                    """
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    post {
        success {
            script {
                if (env.BRANCH_NAME == 'develop') {
                    echo '개발 환경(EC2) 배포 성공'
                } else if (env.BRANCH_NAME == 'infra/create-new-server') {
                    echo '운영 환경(GCP) 배포 성공'
                }
            }
        }
        failure {
            script {
                if (env.BRANCH_NAME == 'develop') {
                    echo '개발 환경(EC2) 배포 실패'
                } else if (env.BRANCH_NAME == 'infra/create-new-server') {
                    echo '운영 환경(GCP) 배포 실패'
                }
            }
        }
        always {
            echo '배포 파이프라인 종료'
            cleanWs()
        }
    }
}