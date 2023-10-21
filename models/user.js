const mongoose = require("../db/connection");

const UserSchema = new mongoose.Schema({
    username: String,
    fullname: String,
    PIN: Number,
    startDate: String,
    position: String,
    hourlyPay: Number,
    kloks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Klok'
    }]
})

const User = mongoose.model("User", UserSchema)

module.exports = User