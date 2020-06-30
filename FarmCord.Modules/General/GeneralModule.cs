using Discord.Commands;
using System.Threading.Tasks;

namespace FarmCord.General.Module
{
	public class GeneralModule : ModuleBase
	{	
		[Command("help")]
		[Summary("Lists the bots commands.")]
		public async Task HelpAsync([Remainder] [Summary("Lists the bots commands.")] string help = "")
		{
			await ReplyAsync("FarmCord Help\nTest");
		}
	}
}

