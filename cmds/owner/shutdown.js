/** const { owner } = require('../../config.json')
module.exports.run = async (client, message) => {
  if (owner.includes(message.author.id)) { message.channel.send('Goodbye! 👋').then(process.exit) }
}

module.exports.info = {
  name: 'shutdown',
  aliases: ['die']
}
**/
