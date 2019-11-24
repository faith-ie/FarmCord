const mongoose = require('mongoose')
const prefixSchema = mongoose.Schema({
serverID: String,
prefix: String
})
module.exports = mongoose.model('prefix', prefixSchema)
