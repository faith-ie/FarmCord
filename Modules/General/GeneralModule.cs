using Discord;
using Discord.Commands;
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
            e.WithColor(Color.DarkTeal);
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
            e.WithColor(Color.DarkTeal);
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
            e.WithColor(Color.DarkTeal);
            e.WithDescription($"**{Context.User.ToString()}**  🏓 {sw.ElapsedMilliseconds}ms");
            await ReplyAsync(embed: e.Build());


        }

        [Command("shop")]
        [Summary("Show the bots shop!")]
        [Alias("sh")]
        public async Task ShopAsync([Remainder][Summary("Show the bot's shop!")] string shop = "")
        {
            await ReplyAsync("Welcome to the store! Unfortunately it is under construction.");
        }

        [Command("start")]
        [Summary("farming")]
        public async Task StartAsync([Remainder][Summary("Start a farm!")] string start = "")
        {
            await ReplyAsync("Would you like to start a farm? Yes or No");
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

                e.WithColor(Color.DarkTeal);
                e.WithDescription($"Your server prefix is now {prefix}!");
                await ReplyAsync(embed: e.Build());
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                Console.ReadLine();
            }
        }
          /*  [Command("banana")]
            [Summary("banan")]
            public async Task BananaAsync()
        {
            try
            {
                await ReplyAsync("http://faith.is-a-qt.wtf/ShareX/2020/09/Banana.jpg");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                Console.ReadLine();
            }
        }*/
    }

    }

    /* [Command("botstats")]
     public async Task StatsAsync([Remainder][Summary("botstats"] int BotVersion, string = "")
     {
         var e = new EmbedBuilder();
         var context = 
         e.WithTitle("")
     } */