@ECHO off
@TITLE FarmCord
ECHO Updating FarmCord.
git pull
ECHO Sucessfully pulled, now rebuilding.
dotnet restore
dotnet build
ECHO Now Running.
dotnet run