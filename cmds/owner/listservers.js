const { owner } = require('../../config.json')
module.exports.run = async (client, message, args) => {
  if (!owner.includes(message.author.id)) return
  const { guilds } = client
  const totalGuildCount = guilds.size
  let page = 1
  if (args[0] && !isNaN(args[0])) {
    page = parseInt(args[0])
  }

  const positionInArray = page - 1
  const offset = 10 * positionInArray
  const list = guilds.map(g => `${g.name} (${g.id})`).slice(0 + offset, offset + 10).join('\n')

  if (offset > totalGuildCount) return message.reply('No such page.')
  message.channel.send({
    embed: {
      title: `Server List - Page ${page}`,
      description: list
    }
  })
}
module.exports.info = {
  name: 'listservers'
}
