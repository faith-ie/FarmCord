const mongoose = require('mongoose')
const DiscordUserSchema = mongoose.Schema ({
    userID: String,
    votedCounter: Number,
    cash: Number,
    marriedTo: String, 
    Inventory: Number
})
module.exports = mongoose.model("DiscordUser", DiscordUserSchema);