using Discord;
using Discord.Commands;
using Discord.WebSocket;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Reflection;
using System.Threading.Tasks;

namespace FarmCord
{
    public class Program
    {
        private DiscordSocketClient _client;
        private IServiceProvider _services;
        private CommandService _commands;
        static void Main(string[] args) => new Program().MainAsync().GetAwaiter().GetResult();

        public async Task MainAsync()

        {
            _client = new DiscordSocketClient(new DiscordSocketConfig
            {
                LogLevel = LogSeverity.Info
            });
            _client.Log += Log;
            await _client.LoginAsync(TokenType.Bot, "Discord Token");
            await _client.StartAsync();
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
                if (!(message.HasStringPrefix("=>", ref argPos) ||
                     message.HasMentionPrefix(_client.CurrentUser, ref argPos))) return;
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

