const Discord = require('discord.js')
const config = require('../../config.json')
const defbotPrefix = config.prefix
const newPrefix = require('../Accounts/prefix.js')
module.exports.run = async (client, message, args, prefixes) =>
const newnewPrefix = new newPrefix ({
serverID: message.guild.id,
prefix: args[0]
})
newnewPrefix.save()
.then(result => console.log(`I have changed my prefix on ${message.guild.id} to \`${args[0]}\``)
.catch(err => console.log(err))
message.channel.send(`My prefix is now ${args[0]}`)

