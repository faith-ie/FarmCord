const config = require('../../config.json')
const defbotPrefix = config.prefix
const NewPrefix = require('../../Accounts/prefix.js')
module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_GUILD')) return
  const findNewprefix = await NewPrefix.findOne({ serverID: message.guild.id })
  if (findNewprefix === null) message.channel.send(`My current prefix is ${defbotPrefix}`)
  const newnewPrefix = new NewPrefix({
    serverID: message.guild.id,
    prefix: args[0]
  })
  newnewPrefix.save()
    .then(result => console.log(`I have changed my prefix on ${message.guild.id} to \`${args[0]}\``))
    .catch(err => console.log(err))
  message.channel.send(`My prefix is now ${args[0]}`)
}
module.exports.info = {
  name: 'prefix'
}
