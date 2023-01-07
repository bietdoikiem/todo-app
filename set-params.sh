#!/bin/bash
export PG_USER="$(aws ssm get-parameters --region us-east-1 --names /todo-app/production/pg_user --query 'Parameters[0].Value' --output text)"
export PG_PASSWORD="$(aws ssm get-parameters --region us-east-1 --names /todo-app/production/pg_password --query 'Parameters[0].Value' --output text)"
export PG_DATABASE="$(aws ssm get-parameters --region us-east-1 --names /todo-app/production/pg_database --query 'Parameters[0].Value' --output text)"
export PG_HOST="$(aws ssm get-parameters --region us-east-1 --names /todo-app/production/pg_host --query 'Parameters[0].Value' --output text)"
export PG_PORT="$(aws ssm get-parameters --region us-east-1 --names /todo-app/production/pg_port --query 'Parameters[0].Value' --output text)"
export JWT_SECRET="$(aws ssm get-parameters --region us-east-1 --names /todo-app/production/jwt_secret --query 'Parameters[0].Value' --output text)"