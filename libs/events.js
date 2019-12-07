const { prefix } = require('../config.json')
const date = new Date()

module.exports = client => {
  client.on('message', async message => {
    if (message.author.bot) return
    if (message.channel.type === 'dm') return
    if (!message.content.startsWith(prefix)) return
    console.log(`User: ${message.author.username} || ${message.author.id} ||`)
    console.log(`Server: ${message.guild.name} || ${message.guild.id} ||`)
    console.log(`Channel: ${message.channel.name} || ${message.channel.id} ||`)
    console.log(`Message: ${message.content}`)

    const args = message.content.slice(prefix.length).split(/ +/g)
    const command = args.shift().toLowerCase()

    const commandfile = client.commands.get(command.toLowerCase())
    if (!commandfile) return
    commandfile.run(client, message, args)
  })

  client.on('ready', () => {
    console.log(' ___       __         __   __   __   __      __     __   __   __   __   __      __   __  ___')
    console.log('|__   /$  |__)  |$/| /  ` /  $ |__) |  $    |  $ | /__` /  ` /  $ |__) |  $    |__) /  $  |  '.replace(/\$/g, '\\'))
    console.log('|    /~~$ |  $  |  | $__, $__/ |  $ |__/    |__/ | .__/ $__, $__/ |  $ |__/    |__) $__/  |  '.replace(/\$/g, '\\'))
    console.log()
    console.log('Made by DVSAEZI#0305')
    console.log(`Logged in at ${date}`)

    client.user.setActivity(`${prefix}help`)
  })

  client.on('guildCreate', async guild => {
    const { id, name, memberCount } = guild
    console.log(`I have joined ${name} with the server id of ${id} that has ${memberCount} members!`)
  })
}
