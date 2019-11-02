var Pastebin = require('pastebin-js')
var processes = require('child_process')
const { owner } = require('../../config.json')
const pastebinClient = new Pastebin({ api_dev_key: '', api_user_name: '', api_user_password: '' })

module.exports.run = async function (client, message, args) {
  // Check if the user has permission to run this command.
  if (!owner.includes(message.author.id)) return

  // Run the shell command.
  const result = await new Promise((rs, rj) => processes.exec(args.join(' '), (err, stdout, stderr) => err ? rj(err) : rs({ out: stdout.toString().trim(), err: stderr.toString().trim() })))

  // Format the output.
  let output = ''
  if (result.out != '') output += 'Standard Output:\n' + result.out
  if (result.err != '') output += (output != '' ? '\n\n' : '') + 'Standard Error:\n' + result.err

  // Check if we can send on Discord.
  if (output.length < 2000) {
    // Send it on Discord.
    message.channel.send('Result:\n\`\`\`xl\n' + output + '\`\`\`')
  } else {
    // Send it to Pastebin.
    const id = await pastebinClient.createPaste(output, 'Exec Output')
    // Tell the user to check Pastebin.
    message.channel.send('The result is to big to send here, so I put it on pastebin here: <' + id + '>.')
  }
}
module.exports.info = {
  name: 'exec',
  aliases: ['ex', 'shell']
}
