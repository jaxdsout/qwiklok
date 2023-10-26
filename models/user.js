const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    fullname: String,
    PIN: String,
    startDate: String,
    position: String,
    hourlyPay: Number,
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    kloks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Klok'
    }]
})

const User = mongoose.model("User", UserSchema)

module.exports = User