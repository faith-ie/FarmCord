const { owner: owners } = require('../../config.json')
const util = require('util')

module.exports.run = async (client, message, args) => {
  if (!owners.includes(message.author.id)) return

  let response

  const clean = text => typeof text === 'string' ? text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203)) : text

  const send = (content) => {
    if (response) { response.then(msg => msg.edit(`${msg.cleanContent}\n\n${content}`)) } else { response = message.channel.send(content) }
  }

  const onError = (error, thrower, reason) => {
    if (thrower != null && typeof thrower.toString === 'function') {
      try { thrower = thrower.toString() } catch { thrower = null }
    }
    if (typeof thrower !== 'string') { thrower = null }

    let content = `An error was raised ${reason === 'base' ? 'while processing your code' : `within a ${reason}`}.\n`
    content += 'Error: ' + (error instanceof Error ? error.message : error)
    send(content)
  }

  const code = args.join(' ')
  try {
    const safeTimeouts = this.safeTimeouts()
    safeTimeouts.onError = onError
    safeTimeouts.code = code
    safeTimeouts.message = message
    safeTimeouts.client = client
    safeTimeouts.channel = message.channel
    safeTimeouts.guild = message.guild
    const out = this.execute.call(safeTimeouts)

    let name = 'undefined'
    let details
    if (out == null) { name = 'null' } else if (typeof out === 'object') {
      const proto = Object.getPrototypeOf(out)
      if (typeof proto === 'object' && typeof proto.constructor === 'function' && typeof proto.constructor.name === 'string') { name = proto.constructor.name }
      details = util.inspect(out)
    } else if (typeof out === 'function') {
      const proto = Object.getPrototypeOf(out)
      if (typeof proto === 'object' && typeof proto.constructor === 'function' && typeof proto.constructor.name === 'string') { name = proto.constructor.name }
      details = out.toString()
    } else { name = out.toString() }

    let content = `Function successfully returned with ${typeof out === 'object' ? 'a ' : ''}\`${name}\`.`
    if (details) content += `\nDetails of object:\n\`\`\`${typeof out === 'function' ? 'js' : 'xl'}\n${clean(details.substring(0, 1500))}${details.length > 2500 ? '\n...' : ''}\`\`\``
    send(content)
  } catch (err) {
    onError(err, code, 'base')
  }
}

module.exports.execute = function () {
  const {
    setTimeout, setInterval, setImmediate,
    clearTimeout, clearInterval, clearImmediate,
    Promise, code: _code, this: _this,
    message, client, channel, guild
  } = this
  function go () { return eval(_code) }
  return go.call(_this)
}

module.exports.safeTimeouts = function () {
  let executing = true
  const timeouts = []

  const onError = function (error, thrower, reason) {
    executing = false
    for (const timeout of timeouts) {
      switch (timeout.method) {
        case 'timeout': global.clearTimeout(timeout); break
        case 'interval': global.clearInterval(timeout); break
        case 'immediate': global.clearImmediate(timeout); break
      }
    }

    if (typeof exports.onError === 'function') { exports.onError(error, thrower, reason) }
  }

  const exports = {
    setTimeout (func, time, ...args) {
      const id = global.setTimeout(function (...args) {
        if (!executing) return
        try { func.call(this, ...args) } catch (error) { onError(error, func, 'setTimeout') }
      }, time, ...args)
      timeouts.push({ id, method: 'timeout' })
      return id
    },

    clearTimeout (id) {
      global.clearTimeout(id)
      const index = timeouts.findIndex(timeout => timeout.id === id)
      timeouts.splice(index, 1)
    },

    setInterval (func, time, ...args) {
      const id = global.setInterval(function (...args) {
        if (!executing) return
        try { func.call(this, ...args) } catch (error) { onError(error, func, 'setInterval') }
      }, time, ...args)
      timeouts.push({ id, method: 'interval' })
      return id
    },

    clearInterval (id) {
      global.clearInterval(id)
      const index = timeouts.findIndex(timeout => timeout.id === id)
      timeouts.splice(index, 1)
    },

    setImmediate (func, time, ...args) {
      const id = global.setImmediate(function (...args) {
        if (!executing) return
        try { func.call(this, ...args) } catch (error) { onError(error, func, 'setImmediate') }
      }, time, ...args)
      timeouts.push({ id, method: 'immediate' })
      return id
    },

    clearImmediate (id) {
      global.clearImmediate(id)
      const index = timeouts.findIndex(timeout => timeout.id === id)
      timeouts.splice(index, 1)
    }
  }

  return exports
}

module.exports.info = {
  name: 'eval',
  aliases: ['e', 'ev']
}
