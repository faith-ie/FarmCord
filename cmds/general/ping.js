module.exports.run = async (client, message) => {
  const ping = Math.ceil(client.ws.ping)
  message.channel.send('🏓 ' + `${ping}` + 'ms')
}
module.exports.info = {
  name: 'ping'
}
