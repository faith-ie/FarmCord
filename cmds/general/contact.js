const Discord = require('discord.js')
const { owner: owners } = require('../../config.json')

module.exports.run = function (client, message, args) {
  const embed = new Discord.MessageEmbed()
    .setColor('#42f5ce')
    .setAuthor('Sent by ' + message.author.tag + ' from ' + message.guild.name, message.author.avatarURL())
    .setDescription(args.slice().join(' '))
    .setFooter('User ID: ' + message.author.id + ' || Sever ID: ' + message.guild.id)
  owners.map(owner => client.users.get(owner)).filter(user => user != null).forEach(owner => owner.send(embed))
}

module.exports.info = {
  name: 'contact'
}
