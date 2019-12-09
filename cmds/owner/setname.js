const { owner } = require('../../config.json')
module.exports.run = async (client, message, args) => {
  if (!owner.includes(message.author.id)) return
  client.user.setUsername(args[0])
}
module.exports.info = {
  name: 'setname'
}
