const mongoose = require('mongoose');
const blackListSchemaUser = mongoose.Schema ({
        username: String,
        userID: String,
        BannedDate: String,
        Reason: String
})


module.exports = mongoose.model("blacklistUser", blackListSchemaUser);