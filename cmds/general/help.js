const Discord = require('discord.js')
module.exports.run = async (client, message) => {
  const embed1 = new Discord.MessageEmbed()
    .setTitle('FarmCord Help Menu')
    .setColor('#42f5ce')
    .addField('Core Features 👨‍🌾', '=>help, =>plant, =>shop')
    .addField('Gambling Features 🎰', '=>rps')
    .addField('Misc Features ⚙️', '=>yomomma, =>catfact')

  message.channel.send(embed1)
}
module.exports.info = {
  name: 'help',
  aliases: ['h']
}
