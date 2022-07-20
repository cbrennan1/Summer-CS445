#!/bin/bash
#Colin Brennan

sudo apt-get update -y
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
sudo npm install @nestjs/common
sudo npm install @nestjs/core
sudo npm install @nestjs/platform-express


cd rest-api/
npm run start:dev
