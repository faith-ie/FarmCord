const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {
  const embed1 = new Discord.MessageEmbed()
    .setColor('#42f5ce')
    .setAuthor('Sent by ' + message.author.tag + ' from ' + message.guild.name, message.author.avatarURL)
    .setDescription(args.slice().join(' '))
    .setFooter('User ID: ' + message.author.id + ' || Sever ID: ' + message.guild.id)
  client.users.get('301379068941828096').send(embed1)
}
module.exports.info = {
  name: 'contact'
}
