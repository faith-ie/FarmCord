const { owner } = require('../../config.json')
module.exports.run = async (client, message, args) => {
  if (!owner.includes(message.author.id)) return
  client.user.setActivity(args[0]).then(message.channel.send('👌'))
}

module.exports.info = {
  name: 'setgame'
}
