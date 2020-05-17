@echo off
TITLE FarmCord
echo Checking for updates...
git pull origin master
npm i
echo Update check completed, starting bot.
node program.js
