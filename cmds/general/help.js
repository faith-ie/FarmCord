const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {
  const embed1 = new Discord.RichEmbed()
    .setTitle('FarmCord Help Menu')
    .setColor('#42f5ce')
    .addField('=>help', 'Help menu, usage is =>help or =>h')
    .addField('=>plant', 'Plant a seed, usage is =>plant or =>pl')
    .addField('=>shop', 'show the store, usage is =>shop or =>sh')

  message.author.send(embed1)
}
module.exports.info = {
  name: 'help',
  aliases: ['h']
}
