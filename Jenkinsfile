pipeline {
    agent any
    tools {
        maven 'maven3.9'
        jdk 'jdk17'
    }
    environment {
        DOCKER_HUB_ID = 'amaldeep98'
        IMAGE_NAME= 'ecommerce-ui'
        HELM_CHART_NAME = 'ecommerce'
        REGION = 'us-east-1'
    }
    stages {
        stage('Git-checkout') {
            steps {
                git 'https://github.com/Amaldeep98/Memory-Monster.git'
            }
        }
        stage('Build') {
            steps {
                sh 'cd ecommerce-ui/client/ && npm install --force && npm run build'
            }
        }
        stage ('docker-login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh 'echo $PASSWORD | docker login -u $USERNAME --password-stdin'
                }
            }

        }
        stage('docker-build') {
            steps {
                sh 'docker build -t $DOCKER_HUB_ID/$IMAGE_NAME:latest ./ecommerce-ui/'
                sh 'docker tag $DOCKER_HUB_ID/$IMAGE_NAME:latest $DOCKER_HUB_ID/$IMAGE_NAME:$BUILD_NUMBER'
            }
        }
        stage('docker-push and cleanup') {
            steps {
                sh 'docker push $DOCKER_HUB_ID/$IMAGE_NAME:latest'
                sh 'docker push $DOCKER_HUB_ID/$IMAGE_NAME:$BUILD_NUMBER'
                sh 'docker rmi $DOCKER_HUB_ID/$IMAGE_NAME:latest'
                sh 'docker rmi $DOCKER_HUB_ID/$IMAGE_NAME:$BUILD_NUMBER' 
            }
        }
        stage('helm-tag-update') {
            steps {
                sh "sed -i 's/tag1: .*/tag1: $BUILD_NUMBER/' ./ecommerce/values.yaml"
                sh "sed -i 's/version: .*/version: $BUILD_NUMBER/' ./ecommerce/Chart.yaml"
            }
        }
        stage ('helm-repo-create') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', 
                  credentialsId: 'aws-creds']]) {
                    sh '''
                        aws ecr-public get-login-password --region $REGION \
                        | helm registry login --username AWS --password-stdin public.ecr.aws
                        
                        
                        aws ecr-public describe-repositories \
                        --repository-names $HELM_CHART_NAME \
                        --region $REGION > /dev/null 2>&1 \
                        || aws ecr-public create-repository \
                        --repository-name $HELM_CHART_NAME \
                        --region $REGION             
                    '''
                }
            }
        }
        stage('helm-push') {
            steps {
                withCredentials([string(credentialsId: 'aws-public-alias', variable: 'AWS_PUBLIC_ALIAS')]) {
                    sh  '''
                        rm -rf *.tgz
                        helm package ./helm
                        helm push $HELM_CHART_NAME-$BUILD_NUMBER.tgz oci://public.ecr.aws/$AWS_PUBLIC_ALIAS
                        
                    '''
                }
            }
        }
        stage('Trigger Deploy Job') {
            steps {
                build job: 'Memory-monster-deploy', parameters: [
                    string(name: 'BUILD_NUMBER_ID', value: "${env.BUILD_NUMBER}"),
                    string(name: 'REGION', value: "${env.REGION}"),
                    string(name: 'HELM_CHART_NAME', value: "${env.HELM_CHART_NAME}")
                ]
            }
        }
    }
    post {
        always {
            sh 'docker logout'
            sh 'rm -rf *.tgz'
        }
    }
}