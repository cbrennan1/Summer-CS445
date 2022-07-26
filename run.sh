#!/bin/bash
#Colin Brennan

sudo apt-get update -y
sudo apt install curl -y
curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
sudo apt-get install -y nodejs   
sudo apt-get install npm -y

node -v
npm -v
npm install -g npm

sudo npm install source-map-support
sudo npm install reflect-metadata
sudo npm install rxjs
sudo npm i -g @nestjs/cli
sudo npm i --save @nestjs/axios
sudo npm install --save-dev jest
sudo npm install ts-jest
sudo npm i --save-dev @types/jest
sudo npm i --save-dev @nestjs/testing
sudo npm install @nestjs/common
sudo npm install @nestjs/core
sudo npm install @nestjs/platform-express



cd rest-api/
npm run test:cov
npm run test
npm run start
