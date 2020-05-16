'use strict'
exports.__esModule = true
if (semver.satisfies(process.version, '=>12.11.1')) { throw new Error('You need node version 12.11.1 or higher') }

var semver = require('semver')
var Discord = require('discord.js')
var config = require('./config.json')
var mongoose = require('mongoose')
var Redis = require('ioredis')
var redis = new Redis(6379)
var client = new Discord.Client()
    client.commands = new Discord.Collection()
    client.aliases = new Discord.Collection()

mongoose.connect('mongodb://localhost:27017/FarmCord', { useNewUrlParser: true, useUnifiedTopology: true })

require('./libs/events.js')(client)
require('./libs/extendedFunctions.js')(client)
require('./libs/database.js')(client)
require('./libs/game.js')(client)

client.login(config.token)
