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
		public async Task UserbBlackListAsync([Remainder][Summary("Blacklists users from using the bot")] string UserBlackList = "")
		{
			await ReplyAsync("h");
		}
	}
}