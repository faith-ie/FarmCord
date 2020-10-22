FROM mcr.microsoft.com/dotnet/core/sdk:3.1

WORKDIR /source

COPY *.csproj .

COPY /FarmCord .

RUN dotnet restore

RUN dotnet build

RUN cd ./bin/Debug/netcoreapp3.1

RUN mkdir FarmCord

RUN cd ./bin/Debug/netcoreapp3.1/FarmCord

RUN cp ./FarmCord/creds.json /bin/Debug/netcoreapp3.1/FarmCord/creds.json

RUN mkdir Assets

RUN cp ./FarmCord/Assets/Island.png /bin/Debug/netcoreapp3.1/FarmCord/Assets

RUN mkdir FarmOutput

RUN dotnet run