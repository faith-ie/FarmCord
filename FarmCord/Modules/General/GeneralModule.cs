using Discord;
using Discord.Commands;
using FarmCord.Services.DailyService;
using FarmCord.Services.PrefixService;
using ImageMagick;
using MongoDB.Driver;
using System;
using System.Diagnostics;
using System.Threading.Tasks;

namespace FarmCord.General.Module
{
    public class GeneralModule : ModuleBase
    {
        [Command("help")]
        [Summary("Lists the bots commands.")]
        [Alias("h")]
        public async Task HelpAsync([Remainder][Summary("Lists the bots commands.")] string help = "")
        {
            var e = new EmbedBuilder();
            ISelfUser client = Context.Client.CurrentUser;
            e.WithTitle($"{client} Help");
            e.WithDescription("`Help`\nLists the bot's commands\n`Invite`\nInvites the bot\n`Ping`\nBot's connection to Discord\n`Shop`\nGet your seeds and items here!\n`Start`\nStart your farm!");
            e.WithColor(3468126);
            await ReplyAsync(embed: e.Build());
        }

        /*  [Command("Contact")]
          [Summary("Contact the owner of the bot")]
          public async Task ContactAsync([Remainder][Summary("Contact the owner of the bot")] string contact = "")
          {
              await ReplyAsync("ok");
          }*/

        [Command("invite")]
        [Summary("invite the bot")]
        public async Task InviteAsync([Remainder][Summary("Invite the bot")] string invite = "")
        {
            var e = new EmbedBuilder();
            e.WithColor(3468126);
            e.WithDescription("Invite me! https://discordapp.com/oauth2/authorize?client_id=630849680431120385&permissions=67423296&scope=bot");
            await ReplyAsync(embed: e.Build());
        }

        [Command("ping")]
        [Summary("Bots connection to Discord")]
        public async Task PingAsync()
        {
            var sw = new Stopwatch();
            sw.Start();
            var message = await ReplyAsync("🏓");
            sw.Stop();
            await message.DeleteAsync();
            var e = new EmbedBuilder();
            e.WithColor(3468126);
            e.WithDescription($"**{Context.User.ToString()}**  🏓 {sw.ElapsedMilliseconds}ms");
            try
            {
                await ReplyAsync(embed: e.Build());
            }
            catch (Exception E)
            {
                Console.WriteLine(E);
            }
        }

        [Command("shop")]
        [Summary("Show the bots shop!")]
        [Alias("sh")]
        public async Task ShopAsync([Remainder][Summary("Show the bot's shop!")] string shop = "")
        {
            var e = new EmbedBuilder();
            e.WithTitle("FarmCord Shop");
            e.WithDescription("**Seeds**\nWatermelon seed (4) - FC$50\nCantalope Seeds (6) - FC$45\nCorn Seeds (5) - FC$60 ");
            e.WithColor(3468126);
            try
            {
                await ReplyAsync(embed: e.Build());
            }
            catch (Exception er)
            {
                Console.WriteLine(er);
            }
        }

        [Command("start")]
        [Summary("farming")]
        public async Task StartAsync([Remainder][Summary("Start a farm!")] string start = "")
        {
            /* var e = new EmbedBuilder();
             e.WithDescription("Would you like to start a farm? Yes or no?");
             e.WithColor(Color.DarkTeal);
             await ReplyAsync(embed: e.Build());*/
            var image = new MagickImage("./FarmCord/Assets/Island.png");
            {
                IUser user = Context.User;
                var id = user.Id;
                new Drawables()
                    .FontPointSize(72)
                    .Font("Comic Sans")
                    .StrokeColor(new MagickColor("White"))
                    .TextAlignment(TextAlignment.Center)
                    .Text(500, 75, $"{Context.User.Username.ToString()}'s Farm")
                    .Draw(image);
                image.Write($"./FarmCord/FarmOutput/Farm_{id}.png");
            }
            try
            {
                // var CacheBytes = image.ToByteArray();
                // MemoryStream stream = new MemoryStream();
                //   var ho = MemoryStream(CacheBytes);

                /*       var o = image.ToByteArray();
                       var des = new EmbedFieldBuilder()
                           .WithValue(o);
                       var e = new EmbedBuilder()
                           .AddField(des);
                       await ReplyAsync(embed: e.Build()); */

                await Context.Channel.SendFileAsync(filePath: $"./FarmCord/FarmOutput/Farm_{Context.User.Id}.png");
            }
            catch (Exception Err)
            {
                Console.WriteLine(Err);
                var E = new EmbedBuilder();
                E.WithColor(16519939);
                E.WithDescription(Err.Message.ToString());
                await Context.Channel.SendMessageAsync(text: "Oops, something went wrong.", embed: E.Build());
            }
        }

        [Command("prefix")]
        [Summary("set the bots prefix")]
        public async Task PrefixAsync(ulong serverid, string prefix = "")
        {
            var prefixmaker = new PrefixService()
            {
                ServerId = serverid,
                Prefix = prefix
            };
            var client = new MongoClient("mongodb://localhost:27017");
            var db = client.GetDatabase("DiscordUser");
            var collection = db.GetCollection<object>("Prefixes");
            try
            {
                collection.InsertOne(prefixmaker);
                var e = new EmbedBuilder();

                e.WithColor(3468126);
                e.WithDescription($"**{Context.User.ToString()}** the server prefix is now {prefix}!");
                await ReplyAsync(embed: e.Build());
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                var E = new EmbedBuilder();
                E.WithColor(16519939);
                E.WithDescription(e.Message.ToString());
                await Context.Channel.SendMessageAsync(text: "Oops, something went wrong.", embed: E.Build());
            }
        }

        [Command("stats")]
        public async Task StatsAsync()
        {
            var dnet = typeof(Discord.WebSocket.BaseSocketClient).Assembly.GetName().Version;
            var dotnet = typeof(System.Version).Assembly.GetName().Version;
            var sys = Process.GetCurrentProcess();
            var sw = new Stopwatch();
            sw.Start();
            // var sysmin
            var process = System.Environment.ProcessorCount;
            var uptime = Process.GetCurrentProcess().StartTime.ToString();
            var syssec = sys.StartTime.Second.ToString();
            var cpu = System.Environment.GetEnvironmentVariable("PROCESSOR_IDENTIFIER");
            var e = new EmbedBuilder();
            e.AddField("Current Uptime: ", $"{uptime}");
            e.AddField("Discord.Net Version: ", dnet);
            e.AddField("DotNet Version: ", dotnet);
            e.AddField("Processors: ", process.ToString());
            //  e.AddField("Processor Type: ", cpu);
            e.WithColor(3468126);
            await ReplyAsync(embed: e.Build());
        }

        [Command("daily")]
        [Alias("timely")]
        public async Task DailyAsync(ulong userid)
        {
            IUser user = await Context.Client.GetUserAsync(userid);
            var DS = new DailyService
            {
                DailyDate = DateTime.UtcNow,
                Amount = 0,
                UserID = user.Id
            };
            var client = new MongoClient("mongodb://localhost:27017");
            var db = client.GetDatabase("DiscordUser");
            var collection = db.GetCollection<object>("Dailies");
            try
            {
                int moremoney = DS.Amount + 100;
                var e = new EmbedBuilder();
                e.WithDescription($"**{Context.User.Username.ToString()}**, FC${moremoney.ToString()} has been added to your account! Your balance is now {DS.Amount + moremoney}.");
                e.WithColor(3468126);
                await collection.InsertOneAsync(DS);
                await ReplyAsync(embed: e.Build());
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                var E = new EmbedBuilder();
                E.WithColor(16519939);
                E.WithDescription(e.Message.ToString());
                await Context.Channel.SendMessageAsync(text: "Oops, something went wrong.", embed: E.Build());
            }
        }
    }
}