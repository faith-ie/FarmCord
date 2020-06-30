using Discord.Commands;
using System;
using System.Threading.Tasks;

namespace FarmCord.Modules
{
	public class GeneralModule : ModuleBase
	{	
		[Command("help")]
		[Summary("Lists the bots commands.")]
		public async Task HelpAsync([Remainder] [Summary("Lists the bots commands.")] string Help = "")
		{
			Console.WriteLine("h");
			await ReplyAsync("FarmCord Help\nTest");
		}
	}
}

