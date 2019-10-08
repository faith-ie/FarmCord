import * as Discord from 'discord.js'
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