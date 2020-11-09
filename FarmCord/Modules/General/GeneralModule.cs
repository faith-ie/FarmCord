using Discord;
using Discord.Commands;
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
            var e = new EmbedBuilder();
            try
            {

              /*  e.WithDescription($"./FarmCord/FarmOutput/Farm_{Context.User.Id}.png");
                e.WithColor(3468126);*/

                await Context.Channel.SendFileAsync(embed: e.Build(), filePath: $"./FarmCord/FarmOutput/Farm_{Context.User.Id}.png");
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
        public async Task StatsAsync()
        {

        }
    }

}

