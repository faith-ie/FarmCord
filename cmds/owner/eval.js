const {owner: owners} = require('../../config.json');

module.exports.run = function(client, message, args) {
  if (!owners.includes(message.author.id)) return;

  const clean = text => {
    if (typeof (text) === 'string') { return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203)) } else { return text }
  }
  
  const onError = (error, thrower, reason) => {
    console.log(error);
    console.log(thrower);
    console.log(reason);
  }

  const code = args.join(" ");
  try {
    const safeTimeouts = this.safeTimeouts();
    safeTimeouts.onError = onError;
    safeTimeouts.code = code;
    this.execute.call(safeTimeouts);

    
  } catch (err) {
    onError(err, code, "base");
  }
}

module.exports.execute = function() {
  const {
    setTimeout, setInterval, setImmediate,
    clearTimeout, clearInterval, clearImmediate,
    Promise
  } = this;
  eval.call(null, this.code);
}

module.exports.safeTimeouts = function() {
  let executing = true;
  const timeouts = [];

  const onError = function(error, thrower, reason) {
    executing = false;
    for (let timeout of timeouts)
      switch (timeout.method) {
        case "timeout": global.clearTimeout(timeout); break;
        case "interval": global.clearInterval(timeout); break;
        case "immediate": global.clearImmediate(timeout); break;
      }
    
    if (typeof exports.onError == "function")
      exports.onError(error, thrower, reason);
  }

  const exports = {
    setTimeout(func, time, ...args) {
      const id = global.setTimeout(function(...args) {
        if (!executing) return;
        try {func.call(this, ...args);}
        catch (error) {onError(error, func, "setTimeout");}
      });
      timeouts.push({id, "method": "timeout"});
      return id;
    },

    clearTimeout(id) {
      global.clearTimeout(id);
      let index = timeouts.findIndex(timeout => timeout.id == id);
      timeouts.splice(index, 1);
    },

    setInterval(func, time, ...args) {
      const id = global.setInterval(function(...args) {
        if (!executing) return;
        try {func.call(this, ...args);}
        catch (error) {onError(error, func, "setInterval");}
      });
      timeouts.push({id, "method": "interval"});
      return id;
    },

    clearInterval(id) {
      global.clearInterval(id);
      let index = timeouts.findIndex(timeout => timeout.id == id);
      timeouts.splice(index, 1);
    },

    setImmediate(func, time, ...args) {
      const id = global.setImmediate(function(...args) {
        if (!executing) return;
        try {func.call(this, ...args);}
        catch (error) {onError(error, func, "setImmediate");}
      });
      timeouts.push({id, "method": "immediate"});
      return id;
    },

    clearImmediate(id) {
      global.clearImmediate(id);
      let index = timeouts.findIndex(timeout => timeout.id == id);
      timeouts.splice(index, 1);
    }
  }

  return exports;
}

module.exports.info = {
  name: 'eval',
  aliases: ['e', 'ev']
}
