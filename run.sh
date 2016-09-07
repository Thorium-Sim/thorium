#!/bin/bash
npm install
npm rebuild node-sass
mix deps.get

mix phoenix.server