const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    organization: String,
});

const Admin = mongoose.model("Admin", AdminSchema)

module.exports = Admin