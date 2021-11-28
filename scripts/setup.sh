#!/bin/bash
. ~/.nvm/nvm.sh
. ~/.profile
. ~/.bashrc
. $(brew --prefix nvm)/nvm.sh  # if installed via Brew
nvm install 17.1.0
nvm use 17.1.0
cd wingspan
npm install 
pip install -r ../requirements.txt
