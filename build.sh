#!/bin/bash

./node_modules/.bin/esbuild ./src/init.tsx --bundle --outfile=./dist/app/init.js 
./node_modules/.bin/esbuild ./src/sw.ts --bundle --outfile=./dist/app/sw.js