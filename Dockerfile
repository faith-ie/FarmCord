FROM mcr.microsoft.com/dotnet/sdk:5.0.102-ca-patch-buster-slim AS BUILDER

WORKDIR /source/

COPY *.csproj /source/

COPY ./ /source/

RUN cd /source/

RUN dotnet restore

RUN dotnet build

RUN cd ./bin/Debug/net5.0/

RUN cd  FarmCord

RUN mkdir FarmOutput/

RUN mkdir Assets/

RUN cd ..

RUN cd ..

RUN cd ..

RUN cd ..

RUN cd FarmCord

COPY /FarmCord/creds.json ./source/bin/Debug/net5.0/FarmCord/

COPY /FarmCord/Assets/Island.png ./source/bin/Debug/net5.0/FarmCord/Assets/

RUN cd ..

RUN cd ./bin/Debug/net5.0/

CMD ["dotnet", "run", "FarmCord.dll"]