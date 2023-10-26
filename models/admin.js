const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    email: String,
    password: String,
    fullname: String,
    organization: String,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }]
})

const Admin = mongoose.model("Admin", AdminSchema)

module.exports = Admin