const mongoose = require('mongoose')
const DailySchema = mongoose.Schema({
  userID: String,
  dailyAmount: Number,
  votedBonus: Boolean,
  dailyTimer: Date
})
module.exports = mongoose.model('Daily', DailySchema)
