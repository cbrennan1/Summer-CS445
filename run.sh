#!/bin/bash
#Colin Brennan

curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
sudo apt-get install -y nodejs   

node -v
npm -v

sudo npm i -g @nestjs/cli

npm start