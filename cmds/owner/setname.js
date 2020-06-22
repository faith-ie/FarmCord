/** const { owner } = require('../../config.json')
module.exports.run = async (client, message, args) => {
  if (!owner.includes(message.author.id)) return
  client.user.setUsername(args.slice(0).join(' ')).then(message.channel.send('👌'))
}
module.exports.info = {
  name: 'setname'
}
*/
