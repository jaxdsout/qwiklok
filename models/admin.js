const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    email: String,
    password: String,
    fullname: String,
    organization: String,
    username: String,
});

const Admin = mongoose.model("Admin", AdminSchema)

module.exports = Admin