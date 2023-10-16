const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: String,
    startDate: String,
    admin: Boolean,
    position: String,
    hourlyPay: Number
})

const User = mongoose.model("User", userSchema)

module.exports = { User }