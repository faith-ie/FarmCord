'use strict'
exports.__esModule = true
var semver = require('semver')
if (semver.satisfies(process.version, '=>12.11.1')) { throw new Error('You need node version 12.11.1 or higher') }
var discord = require('discord.js')
var config = require('./config.json')
var mongoose = require('mongoose')
var Redis = require('ioredis')
var redis = new Redis(6379)
mongoose.connect('mongodb://localhost:27017/FarmCord', { useNewUrlParser: true, useUnifiedTopology: true })
var client = new discord.Client()
client.commands = new discord.Collection()
client.aliases = new discord.Collection()
require('./libs/events.js')(client)
require('./libs/extendedFunctions.js')(client)
client.login(config.token)
