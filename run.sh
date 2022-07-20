#!/bin/bash
#Colin Brennan

curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
sudo apt-get install -y nodejs   
sudo apt-get install npm -y
node -v
npm -v

sudo npm i -g @nestjs/cli

cd rest-api/
npm run start:dev
