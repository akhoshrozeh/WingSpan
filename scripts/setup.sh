#!/bin/bash
. $(brew --prefix nvm)/nvm.sh
nvm install 17.1.0
nvm use 17.1.0
pip install -r ../requirements.txt
