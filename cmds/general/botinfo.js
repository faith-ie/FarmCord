let process = require('process')
let mem = Math.ceil(process.memoryUsage().rss)
let uptime = process.uptime();
let Discord = require('discord.js')
module.exports.run = async (client, message, args) => {
    let embed1 = new Discord.RichEmbed()
    .setTitle('FarmCord Info')
    .setColor('#42f5ce')
    .addField(`I am using ${mem / 1024 / 1024}MB`, 'Wow! Look at that memory usage!')
    .addField(`and I have been online for ${uptime} minutes`, 'Look at that uptime!')
    .setFooter(`${message.author.name}`)
    message.channel.send(embed1)
}
module.exports.info = {
    name: "botinfo",
    aliases: [ "stats" ]
}