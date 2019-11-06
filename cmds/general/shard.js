module.exports.run = async (client, message, args) => {
    let output = ['SHARD | STATUS | GUILDS | PING', '__________________']
const shards = client.ws.shards.map(s => s.status);
shards.forEach((alive) => alive === 0 ? '💚' : '💔');
shards.map(sh => `${sh.id}` === currentShard ? `>>>${sh.id}`.length : sh.id.toString().length, client.ws.shard.status === 5 )
}
module.exports.info = {
    name: 'shards',
    aliases: ['shardstats']
}