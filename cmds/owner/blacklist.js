const blacklist = require('../../Accounts/blacklist.js')
const account = require('../../Accounts/DiscordUser.js')
const { owner } = require('../../config.json')
const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {
  // check if user is owner
  if (!owner.includes(message.author.id)) return

  // blacklist guild {id}
  if (args[0] === 'guild') {
  }

  // blacklist user {id} {id} {id}
  if (args[0] === 'user') {
    const acc = await account.findOne({ userID: message.author.id })
    if (acc === null) message.channel.send("This user doesn't have an account yet!")
    const users = message.mentions.users
    users.tap(user => {
      const BL = blacklist
      const newBL = new BL({
        username: user.tag,
        userID: user.id,
        BannedDate: message.CreatedAt,
        Reason: args.slice(message.mentions.users.size).join(/ +/g)
      })

      const embed1 = new Discord.RichEmbed()
        .setTitle('Farmcord')
        .setColor('42f5ce')
        .setTimestamp()
        .setDescription('You have been blacklisted from FarmCord.')

      user.dmChannel.send(embed1)
      newBL.save()
      message.channel.send('User(s) successfully blacklisted!')
    })
  }
}

module.exports.info = {
  name: 'blacklist',
  aliases: ['ubl']
}
