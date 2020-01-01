const Discord = require('discord.js')
const mongodb = require('mongodb')
const Account = require('../../Accounts/DiscordUser.js')
module.exports.run = async (client, message, args) => {
  const Acc = await mongodb.findOne
  const embed1 = new Discord.MessageEmbed()
    .setTitle('Welcome to FarmCord!')
    .setColor('#42f5ce')
    .setDescription('Would you like to make a farm? Yes or No.')
  message.channel.send(embed1)
  const filter = m => m.content.includes('Yes') && m.author.id === message.author.id
  const collector = message.channel.createMessageCollector(filter, { time: 30000 })
  collector.on('collect', async m => {
  })
}
module.exports.info = {
  name: 'start'
}
