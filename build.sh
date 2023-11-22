#!/bin/bash

./node_modules/.bin/esbuild ./src/init.tsx --bundle --outfile=./dist/js/init.js 
./node_modules/.bin/esbuild ./src/sw.ts --bundle --outfile=./dist/js/sw.js