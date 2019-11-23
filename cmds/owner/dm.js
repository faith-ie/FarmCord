const Discord = require('discord.js')
const { owner } = require('../../config.json')
module.exports.run = async (client, message, args) => {
  if (!owner.includes(message.author.id)) return
  const embed1 = new Discord.MessageEmbed()
    .setColor('#42f5ce')
    .setAuthor('Owner of ' + client.user.tag, client.user.displayAvatarURL())
    .setDescription(args.slice(1).join(/ +/g))
    .setFooter('You can reply to this message with =>contact')
  client.users.get(args[0]).send(embed1)
}
module.exports.info = {
  name: 'dm'
}
