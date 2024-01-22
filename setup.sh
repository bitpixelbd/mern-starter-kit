#!/usr/bin/env bash

echo 'Setting up api...'

cd api

cp .env.example .env

npm install

cd ../admin

cp .env.example .env

npm install

cd ../website

cp .env.example .env.local

npm install

echo 'Setup done. To run all projects at once: npm run start'
