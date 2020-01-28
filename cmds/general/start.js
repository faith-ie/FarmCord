const Discord = require('discord.js')
const mongodb = require('mongodb')
module.exports.run = async (client, message, args) => {
  const embed1 = new Discord.MessageEmbed()
    .setTitle('Welcome to FarmCord!')
    .setColor('#42f5ce')
    .setDescription('Would you like to make a farm? Yes or No.')
  message.channel.send(embed1)
}
module.exports.info = {
  name: 'start'
}
