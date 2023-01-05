#!/bin/bash

## Install Docker ##
sudo yum update -y
sudo amazon-linux-extras install docker
sudo service docker start
# Make docker auto start
sudo systemctl enable docker
# Set docker default user permission
sudo usermod -a -G docker ec2-user

## Install Docker Compose ##
wget https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)
sudo mv docker-compose-$(uname -s)-$(uname -m) /usr/local/bin/docker-compose
sudo chmod -v +x /usr/local/bin/docker-compose

## Set DB credentials from AWS Parameter store ##
export PG_USER="$(aws ssm get-parameters --names /todo-app/production/pg_user --query 'Parameters[0].Value' --output text)"
export PG_PASSWORD="$(aws ssm get-parameters --names /todo-app/production/pg_password --query 'Parameters[0].Value' --output text)"
export PG_DATABASE="$(aws ssm get-parameters --names /todo-app/production/pg_database --query 'Parameters[0].Value' --output text)"
export PG_HOST="$(aws ssm get-parameters --names /todo-app/production/pg_host --query 'Parameters[0].Value' --output text)"
export PG_PORT="$(aws ssm get-parameters --names /todo-app/production/pg_port --query 'Parameters[0].Value' --output text)"

## Run docker image with env vars set ##
docker run -d -t -i \
  -e PG_USER="$PG_USER" \
  -e PG_PASSWORD="$PG_PASSWORD" \
  -e PG_DATABASE="$PG_DATABASE" \
  -e PG_HOST="$PG_HOST" \
  -e PG_PORT="$PG_PORT" \
  -p 80:3001 \
  --name todo-app bietdoikiem/todo-app

