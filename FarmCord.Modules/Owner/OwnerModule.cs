using Discord;
using Discord.Commands;
using System.Threading.Tasks;

namespace FarmCord.Owner.Module
{
    [RequireOwner]
    public class OwnerModule : ModuleBase
    {
        [Command("userblacklist")]
        [Summary("Blacklists users from using the bot")]
        [Alias("ubl")]
        public async Task UserBlackListAsync([Remainder][Summary("Blacklists users from using the bot")] string UserBlackList = "")
        {
            await ReplyAsync("h");
        }
        [Command("serverblacklist")]
        [Summary("Blacklists servers from using the bot")]
        [Alias("sbl")]
        public async Task ServerBlackListAsync([Remainder][Summary("Blacklists servers from using the bot")] string ServerBlackList = "")
        {
            await ReplyAsync("Test");
        }
        [Command("dm")]
        [Summary("DM's a person")]
        public async Task DmAsync(string user, [Remainder] string dm = "")
        {
            IUser User = await Context.Client.GetUserAsync(ulong.Parse(user));
            IDMChannel Dm = await User.GetOrCreateDMChannelAsync();
            ISelfUser client = Context.Client.CurrentUser;
            var embed = new EmbedBuilder();
            embed.WithAuthor($"Owner of {client}");
            embed.WithThumbnailUrl(client.GetAvatarUrl());
            embed.WithColor(Color.DarkTeal);
            embed.WithDescription(dm);
            embed.WithFooter("You can reply to this message with =>contact");
            await Dm.SendMessageAsync(embed: embed.Build());
        }
        [Command("listservers")]
        [Summary("list all the servers the bot is in")]
        public async Task ListServersAsync([Remainder][Summary("list all the servers the bot is in")] string listservers = "")
        {
            await ReplyAsync("many servers");
        }
        [Command("setgame")]
        [Summary("sets the bot's game")]
        public async Task SetGameAsync([Remainder][Summary("Sets the bots game")] string setgame = "")
        {
            await ReplyAsync("gaming");
        }
        [Command("setstatus")]
        [Summary("Sets the bots status")]
        public async Task SetStatusAsync([Remainder][Summary("sets the bots status")] string setstatus = "")
        {
            await ReplyAsync("0215028");
        }
        [Command("shutdown")]
        [Summary("Shuts down the bot")]
        [Alias("die", "kill")]
        public async Task ShutDownAsync([Remainder][Summary("Shuts down the bot")] string shutdown = "")
        {
            await ReplyAsync("Shutting Down");
            System.Environment.Exit(0);
        }
    }
}
