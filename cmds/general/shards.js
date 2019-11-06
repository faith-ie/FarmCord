module.exports.run = async (client, message, args) => {
 let shardsContent = ['STATUS | SHARD | PING | GUILDS'];
client.ws.shards.forEach(shard => { shardsContent.push(`${shard.status == 0 ? ':green_heart:' : ':broken_heart:' } - ${shard.id} - ${shard.ping}ms - ${client.guilds.size} guilds`)});
message.channel.send(shardsContent.join('\n'));

}
module.exports.info = {
    name: 'shards',
    aliases: ['shardstats']
}
