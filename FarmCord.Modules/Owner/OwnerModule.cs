using Discord.Commands;
using System.Threading.Tasks;

namespace FarmCord.Owner.Module
{
    public class OwnerModule : ModuleBase
    {
        [Command("userblacklist")]
        [Summary("Blacklists users from using the bot")]
        [Alias("ubl")]
        [RequireOwner]
        public async Task UserBlackListAsync([Remainder][Summary("Blacklists users from using the bot")] string UserBlackList = "")
        {
            await ReplyAsync("h");
        }
        [Command("serverblacklist")]
        [Summary("Blacklists servers from using the bot")]
        [Alias("sbl")]
        [RequireOwner]
        public async Task ServerBlackListAsync([Remainder][Summary("Blacklists servers from using the bot")] string ServerBlackList = "")
        {
            await ReplyAsync("Test");
        }
        [Command("dm")]
        [Summary("DM's a person")]
        [RequireOwner]
        public async Task DmAsync([Remainder][Summary("DM's a person using the bot")] string dm = "")
        {
            await ReplyAsync("000000");
        }

        [Command("listservers")]
        [Summary("list all the servers the bot is in")]
        [RequireOwner]

        public async Task ListServersAsync([Remainder][Summary("list all the servers the bot is in")] string listservers = "")
        {
            await ReplyAsync("many servers");
        }

        [Command("setgame")]
        [Summary("sets the bot's game")]
        [RequireOwner]
        public async Task SetGameAsync([Remainder][Summary("Sets the bots game")] string setgame = "")
        {
            await ReplyAsync("gaming");
        }

        [Command("setstatus")]
        [Summary("Sets the bots status")]
        [RequireOwner]
        public async Task SetStatusAsync([Remainder][Summary("sets the bots status")] string setstatus = "")
        {
            await ReplyAsync("0215028");
        }

        [Command("shutdown")]
        [Summary("Shuts down the bot")]
        [Alias("die", "kill")]
        [RequireOwner]

        public async Task ShutDownAsync([Remainder][Summary("Shuts down the bot")] string shutdown = "")
        {
            await ReplyAsync("Shutting Down");
            System.Environment.Exit(0);
        }
    }
}