const Discord = require('discord.js')
const { owner } = require('../../config.json')
module.exports.run = async (client, message, args) => {
  if (!owner.includes(message.author.id)) return
  const embed1 = new Discord.MessageEmbed()
    .setColor('#42f5ce')
    .setDescription(args.slice(0).join(' ')
    )
  message.channel.send(embed1)
}
module.exports.info = {
  name: 'say'
}
