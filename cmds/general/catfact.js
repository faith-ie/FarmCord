const Discord = require('discord.js')
const cf = require('cat-facts')
const cfr = cf.random()
module.exports.run = async (client, message) => {
  const embed1 = new Discord.MessageEmbed()
    .setColor('#42f5ce')
    .setDescription(cfr + ' 🐈')
  message.channel.send(embed1)
}
module.exports.info = {
  name: 'catfact',
  aliases: ['cf']
}
