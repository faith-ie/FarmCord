const Discord = require('discord.js');
const prefix = require('../config.json')
module.exports.run = async(client, message, args) => {
    let embed1 = new Discord.RichEmbed()
    .setTitle("FarmCord Help Menu")
    .setColor("RANDOM")
    .addField('=>help', 'Help menu')
    .addField('=>plant', 'Plant a seed')
    .addField('=>shop', 'show the store')
    message.author.send(embed1)
}
module.exports.program = {
name: "help"
}