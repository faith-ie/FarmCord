const Discord = require('discord.js')
const mongodb = require('mongodb')
module.exports.run = async (client, message, args) => {
  const Acc = await mongodb.findOne
  const embed1 = new Discord.MessageEmbed()
    .setTitle('Welcome to FarmCord!')
    .setColor('#42f5ce')
    .setDescription('Would you l')
}
module.exports.info = {
  name: 'start'
}
