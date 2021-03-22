using Discord;
using Discord.Commands;
using Discord.WebSocket;
using FarmCord.Services.Crop;
using FarmCord.Services.DailyService;
using FarmCord.Services.MongoService;
using FarmCord.Services.PrefixService;
using FarmCord.Services.ServerBlackListService;
using FarmCord.Services.UserBlackListService;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;

namespace FarmCord
{
    public class Program
    {
        private DiscordSocketClient _client;
        private IServiceProvider _services;
        private CommandService _commands;
        public static creds creds = null;
        public static ServerBlackListDoc ServerBlackListDoc = null;
        public static PrefixService PrefixService = null;
        public static UserBlackListDoc UserBlackListDoc = null;
        public static MongoService MongoService = null;
        public static DailyService DailyService = null;
        public static Crop Crop = null;

        private static void Main(string[] args) => new Program().MainAsync().GetAwaiter().GetResult();

        public async Task MainAsync()

        {
            creds = JsonConvert.DeserializeObject<creds>(File.ReadAllText(@"./FarmCord/creds.json"));

            _client = new DiscordSocketClient(new DiscordSocketConfig
            {
                LogLevel = LogSeverity.Info
            });
            _client.Log += Log;
            await _client.LoginAsync(TokenType.Bot, creds.Token);
            await _client.StartAsync();
            _client.Ready += () =>
           {
               // ulong si = ServerBlackListDoc.ServerId;
               // List<ServerBlackListDoc> serverBlackLists;
               // var  Sbl = serverBlackLists.ToArray();
               //   var g = _client.GetGuild(ulong.Parse(si));
               //  object p = g;
               _client.SetGameAsync("Start your farm today!");
               var c = new MongoClient("mongodb://localhost:27017");
               var d = c.GetDatabase("DiscordUser");
               var co = d.GetCollection<object>("ServerBlackLists");
               //  var sbl = co.Find(
               //    object filter = co.FindAsync<object>(g);
               //  if (sbl) return null;
               return Task.CompletedTask;
           };
            _commands = new CommandService();
            _services = new ServiceCollection()
        .AddSingleton(_client)
        .AddSingleton(_commands)
        .AddSingleton<CommandHandler>()
        .BuildServiceProvider();
            await _services.GetRequiredService<CommandHandler>().InstallCommandsAsync();

            await Task.Delay(-1);
        }

        private Task Log(LogMessage message)
        {
            Console.WriteLine(message.ToString());
            return Task.CompletedTask;
        }

        public class CommandHandler
        {
            private readonly DiscordSocketClient _client;
            private readonly CommandService _commands;

            public CommandHandler(DiscordSocketClient client, CommandService commands)
            {
                _commands = commands;
                _client = client;
            }

            public async Task InstallCommandsAsync()
            {
                _client.MessageReceived += HandleCommandAsync;
                await _commands.AddModulesAsync(assembly: Assembly.GetEntryAssembly(), services: null);
            }

            private async Task HandleCommandAsync(SocketMessage messageParam)
            {
                var message = messageParam as SocketUserMessage;
                if (message == null) return;
                int argPos = 0;
                if (!(message.HasStringPrefix(creds.prefix, ref argPos) || message.HasMentionPrefix(_client.CurrentUser, ref argPos))) return;
                if (message.Author.IsBot) return;
                var context = new SocketCommandContext(_client, message);
                var result = await _commands.ExecuteAsync(
                    context: context,
                    argPos: argPos,
                    services: null);
            }
        }
    }
}