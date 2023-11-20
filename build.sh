#!/bin/bash

./node_modules/.bin/esbuild ./src/app.tsx --bundle --outfile=./dist/js/app.js 
./node_modules/.bin/esbuild ./src/sw.ts --bundle --outfile=./dist/js/sw.js