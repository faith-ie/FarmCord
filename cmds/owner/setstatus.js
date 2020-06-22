/** const { owner } = require('../../config.json')
module.exports.run = async (client, message, args) => {
  if (!owner.includes(message.author.id)) return
  if (args[0] === 'online') client.user.setStatus('online').then(message.channel.send('👌'))
  if (args[0] === 'idle') client.user.setStatus('idle').then(message.channel.send('👌'))
  if (args[0] === 'dnd') client.user.setStatus('dnd').then(message.channel.send('👌'))
  if (args[0] === 'offline') client.user.setStatus('offline').then(message.channel.send('👌'))
}
module.exports.info = {
  name: 'setstatus'
}
**/
