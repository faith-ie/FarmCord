const { Attachment } = require('discord.js')
module.exports.run = async (client, message, args) => {
  const attach1 = new Attachment('E:/FarmCord/template.png')
  message.channel.send(attach1)
}
module.exports.info = {
  name: 'start'
}
