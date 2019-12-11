const mem = Math.ceil(process.memoryUsage().rss)
const uptime = Math.floor(process.uptime())
const Discord = require('discord.js')
module.exports.run = async (client, message) => {
  const embed1 = new Discord.MessageEmbed()
    .setTitle('FarmCord Info')
    .setColor('#42f5ce')
    .addField(`I am using ${mem / 1e+6}MB`, 'Wow! Look at that memory usage!')
    .addField(`and I have been online for ${uptime} minutes`, 'Look at that uptime!')
    .setFooter(`${message.author.name}`)
  message.channel.send(embed1)
}
module.exports.info = {
  name: 'botinfo',
  aliases: ['stats']
}
