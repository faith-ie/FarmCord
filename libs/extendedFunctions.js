module.exports = client => {
  const fs = require('fs')

  // read comands folder to get internal folders
  fs.readdir(`${__dirname}/../cmds/`, (err, files) => {
    if (err) console.log(err)

    // for each internal folder
    files.forEach(folder => {
      // read the folder to get all commands inside it
      fs.readdir(`${__dirname}/../cmds/${folder}/`, (_err, command) => {
        const jsfile = command.filter(f => f.split('.').pop() === 'js')
        if (jsfile.length <= 0) {
          console.log('Command not found.')
          return
        }

        jsfile.forEach((f, i) => {
          const props = require(`${__dirname}/../cmds/${folder}/${f}`)
          console.log(`${f} loaded!`)
          client.commands.set(props.info.aliases)
          client.commands.set(props.info.name, props)
          if (props.info.aliases) props.info.aliases.forEach(a => client.commands.set(a, props))
          console.log(props)
        })
      })
    })
  })
}
