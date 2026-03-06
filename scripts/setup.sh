#!/bin/bash

npm install

if [ "$1" == "--run" ]; then
    npm run dev
fi
