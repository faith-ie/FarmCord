const mongoose = require('mongoose');
const blacklistSchema = mongoose.Schema ({
        username: String,
        userID: String,
        BannedDate: String,
        Reason: String
})
module.exports = mongoose.model("blacklist", blacklistSchema);