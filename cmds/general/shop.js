const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {
    let embed1 = new  Discord.RichEmbed()
    .setTitle("FarmCord Shop")
    .setDescription("```Welcome to the store!\n\nWheat - $??\nMelon Seeds - $??\nSugarcane - $??\nWatermellon Seeds - $??\nCarrots - $??\nPotatoes - $??\nTomatoes - $??\nOrange Seeds - $??\nBanana Seeds - $??\nMango Seeds - $??```")
    .setColor("#42f5ce")
    .setFooter("The costs is per seed.")

    message.channel.send(embed1)
}
module.exports.info = {
name: "shop",
aliases: [ "sh" ]
}

//Store Items
//Wheat
//Melon Seeds
//Sugarcane
//Watermellon Seeds
//Carrots
//Potatoes
//Tomato Seeds
//Orange Seeds
//Banana Seeds
//Mango Seeds