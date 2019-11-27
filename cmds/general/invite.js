const Discord = require('discord.js')
module.exports.run = async (client, message) => {
  const embed1 = new Discord.MessageEmbed()
    .setTitle('Invite me!')
    .setColor('#42f5ce')
    .setDescription('https://discordapp.com/oauth2/authorize?client_id=630849680431120385&permissions=67423296&scope=bot')
  message.channel.send(embed1)
}
module.exports.info = {
  name: 'invite'
}
