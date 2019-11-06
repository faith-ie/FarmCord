module.exports.run = async (client, message, args) => {
function rpsCheck (client, message, args){
let allOptions = [ `:rock:`, `✂`, `📰` ]
const botChoice = allOptions[Math.floor(Math.random() * allOptions.length)]
let choice, result = 2, willLoseIf;
switch(args[0] && args[0].toLowerCase() || ""){
    case 'rock':
    case 'rocks':
    case 'r':
        choice = `<:rock:641625997879410700>`
        willLoseIf = `📰`
    break;
    case 's':
    case 'scissors':    
    case 'scissor':    
        choice = `✂`
        willLoseIf = `📰`
    break;
    case 'paper':
    case 'p':
    case 'papers':
        choice = `📰`
        willLoseIf = `✂`
}
if(willLoseIf === botChoice){
    result = 0
}else if(botChoice === choice){
    result = 1
}

if(willLoseIf === 0) message.channel.send('You lost your bet!')

return result
}}
module.exports.info = {
    name: 'rockpaperscissors',
    aliases: ['rps']
}