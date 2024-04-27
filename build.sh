#!/bin/bash

./node_modules/.bin/esbuild ./src/init.tsx --sourcemap --bundle --outfile=./dist/app/init.js 
./node_modules/.bin/esbuild ./src/sw.ts --sourcemap --bundle --outfile=./dist/app/sw.js