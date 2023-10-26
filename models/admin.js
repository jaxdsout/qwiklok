const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    email: String,
    password: String,
    fullname: String,
    organization: String,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})

const Admin = mongoose.model("Admin", AdminSchema)

module.exports = Admin