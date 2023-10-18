const mongoose = require("../db/connection");

const UserSchema = new mongoose.Schema({
    username: String,
    startDate: String,
    admin: Boolean,
    position: String,
    hourlyPay: Number
})

const User = mongoose.model("User", UserSchema)

module.exports = User