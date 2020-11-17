FROM mcr.microsoft.com/dotnet/sdk:5.0 AS BUILDER
WORKDIR /source

COPY *.csproj .
RUN dotnet restore

COPY . ./
RUN dotnet publish -c Release -o out


FROM mcr.microsoft.com/dotnet/runtime:5.0
WORKDIR /farm

COPY --from=BUILDER /source/out .

# def won't mess anything up :^)
RUN rm FarmCord

COPY FarmCord/creds.json ./FarmCord/
CMD ["dotnet", "FarmCord.dll"]