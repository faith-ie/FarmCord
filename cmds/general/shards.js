module.exports.run = async (client, message) => {
  const shardsContent = ['STATUS | SHARD | PING | GUILDS']
  client.ws.shards.forEach(shard => { shardsContent.push(`${shard.status === 0 ? '💚' : '💔'} - ${shard.id} - ${shard.ping}ms - ${client.guilds.size} guilds`) })
  message.channel.send(`\`\`\`${shardsContent.join('\n')}\`\`\``)
}
module.exports.info = {
  name: 'shards',
  aliases: ['shardstats']
}
