module.exports.run = async (client, message, args) => {
 let ping = Math.ceil(client.ws.ping)
 message.channel.send('Pong! ' + `${ping}` + 'ms 🏓')
}
module.exports.info = {
  name: 'ping'
}
