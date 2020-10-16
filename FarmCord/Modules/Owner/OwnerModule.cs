﻿using Discord;
using Discord.Commands;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Threading.Tasks;

namespace FarmCord.Owner.Module
{
    [RequireOwner]
    public class OwnerModule : ModuleBase
    {

        [Command("serverblacklist")]
        [Summary("Blacklists servers from using the bot")]
        [Alias("sbl")]
        public async Task ServerBlackListAsync(ulong serverid, string reason = "")
        {
            IGuild server = await Context.Client.GetGuildAsync(serverid);
            var SBLD = new ServerBlackListDoc
            {
                ServerName = server.Name,
                ServerId = server.Id,
                BanDate = DateTime.UtcNow,
                Reason = reason
            };


            var client = new MongoClient("mongodb://localhost:27017");
            var db = client.GetDatabase("DiscordUser");
            var collection = db.GetCollection<object>("ServerBlackLists");

            try
            {
                await collection.InsertOneAsync(SBLD);
                var e = new EmbedBuilder();
                e.WithDescription($"Server **{server.Name}** `{server.Id}` has been blacklisted. 👌");
                e.WithColor(Color.DarkTeal);
                await ReplyAsync(embed: e.Build());
            }
           
            catch (Exception e)
            {
                
                Console.WriteLine(e);
                var E = new EmbedBuilder();
                E.WithColor(16519939);
                E.WithDescription(e.Message.ToString());
                await Context.Channel.SendMessageAsync(text: "OH FUCK I BROKE", embed: E.Build());

            }

        }
        [Command("userblacklist")]
        [Summary("Blacklists users from using the bot")]
        [Alias("ubl")]
        public async Task UserBlackListAsync(ulong userid, string username, string reason = "")
        {
            IUser user = await Context.Client.GetUserAsync(userid);

            var UBLD = new UserBlackListDoc
            {
                UserId = userid,
                BanDate = DateTime.UtcNow,
                Reason = reason,
                UserName = user.Username
            };
            var uname = user.Username;
            var client = new MongoClient("mongodb://localhost:27017");
            var db = client.GetDatabase("DiscordUser");
            var collection = db.GetCollection<object>("UserBlackLists");
           
            try
            {
                
                await collection.InsertOneAsync(UBLD);
                var e = new EmbedBuilder();
                e.WithDescription($"User **{uname}** `{userid}` has been blacklisted. 👌");
                e.WithColor(Color.DarkTeal);
                await ReplyAsync(embed: e.Build());
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                var E = new EmbedBuilder();
                E.WithColor(16519939);
                E.WithDescription(e.Message.ToString());
                await Context.Channel.SendMessageAsync(text: "OH FUCK I BROKE", embed: E.Build());
            }

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
            try
            {
                await Dm.SendMessageAsync(embed: embed.Build());
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                Console.ReadLine();

            }
        }
        [Command("listservers")]
        [Summary("list all the servers the bot is in")]
        public async Task ListServersAsync([Remainder][Summary("list all the servers the bot is in")] string listservers = "")
        {
            try
            {
                await ReplyAsync("many servers");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                Console.ReadLine();
            }
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
          
        }
        [Command("shutdown")]
        [Summary("Shuts down the bot")]
        [Alias("die", "kill", "commit die")]
        public async Task ShutDownAsync([Remainder][Summary("Shuts down the bot")] string shutdown = "")
        {
            var e = new EmbedBuilder();
            e.WithDescription($"**{Context.User.ToString()}** shutting down");
            e.WithColor(Color.DarkTeal);
            await ReplyAsync(embed: e.Build());
            System.Environment.Exit(0);
        }
       
    }
}
