"use strict";
exports.__esModule = true;
var semver = require('semver');

if (semver.satisfies(process.version, '=>12.11.1'))

    throw new Error("You need node version 12.11.1 or higher");

var discord_js_1 = require("discord.js");

var config_json_1 = require("./config.json");

var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/FarmCord', { useNewUrlParser: true, useUnifiedTopology: true });

var client = new discord_js_1.Client();

client.commands = new discord_js_1.Collection();

client.aliases = new discord_js_1.Collection();

require('./libs/events.js')(client);

require('./libs/extendedFunctions.js')(client);

client.login(config_json_1.token);
//TODO: Remind dv she is literally adorable
