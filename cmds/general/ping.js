module.exports.run = async(client, message, args) => {
    message.channel.send(`Pong! ${client.ping}ms`)
}
module.exports.info = {
    name: "ping"
}