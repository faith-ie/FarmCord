const Discord = require('discord.js')
const ym = require('yo-mamma').default

module.exports.run = async (client, message) => {
  const embed1 = new Discord.MessageEmbed()
    .setColor('#42f5ce')
    .setDescription(ym() + ' 🤣')
  message.channel.send(embed1)
}

module.exports.info = {
  name: 'yomomma',
  aliases: ['ym']
}
