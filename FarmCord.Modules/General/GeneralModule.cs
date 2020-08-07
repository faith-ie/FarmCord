using Discord.Commands;
using System.Threading.Tasks;
using System.Diagnostics;

namespace FarmCord.General.Module
{
    public class GeneralModule : ModuleBase
    {
        [Command("help")]
        [Summary("Lists the bots commands.")]
        [Alias("h")]
        public async Task HelpAsync([Remainder][Summary("Lists the bots commands.")] string help = "")
        {
            await ReplyAsync("FarmCord Help\nTest");
        }
        [Command("Contact")]
        [Summary("Contact the owner of the bot")]
        public async Task ContactAsync([Remainder][Summary("Contact the owner of the bot")] string contact = "")
        {
            await ReplyAsync("ok");
        }
        [Command("invite")]
        [Summary("invite the bot")]
        public async Task InviteAsync([Remainder][Summary("Invite the bot")] string invite = "")
        {
            await ReplyAsync("Invite me! https://discordapp.com/oauth2/authorize?client_id=630849680431120385&permissions=67423296&scope=bot");
        }
        [Command("ping")]
        [Summary("Bots connection to Discord")]
        public async Task PingAsync([Remainder][Summary("ping pong")] string ping = "")
        {
            var sw = new Stopwatch();
            sw.Start();
            var message = await ReplyAsync("🏓");
            sw.Stop();
           await message.DeleteAsync();
            await ReplyAsync($"{Context.User.ToString()}  🏓 {sw.ElapsedMilliseconds}ms");


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
    }
}

