module.exports.run = async (client, message, args) => {
    let output = ['SHARD | STATUS | GUILDS', '__________________']
const shards = client.ws.shards.map(s => s.status);
shards.forEach((alive) => alive === 0 ? '💚' : '💔');

}
module.exports.info = {
    name: 'shards',
    aliases: ['shardstats']
}