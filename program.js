'use strict'
require('dotenv').config()
exports.__esModule = true
var semver = require('semver')
if (semver.satisfies(process.version, '=>12.11.1')) { throw new Error('You need node version 12.11.1 or higher') }
var Eris = require('eris')
var mongoose = require('mongoose')
var Redis = require('ioredis')
var redis = new Redis(6379)
var client = new Eris(process.env.token)
mongoose.connect('mongodb://localhost:27017/FarmCord', { useNewUrlParser: true, useUnifiedTopology: true })
require('./libs/events.js')(client)
require('./libs/extendedFunctions.js')(client)
require('./libs/database.js')(client)
require('./libs/game.js')(client)
client.connect(process.env.token)
