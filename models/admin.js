const mongoose = require("mongoose");

const KlokSchema = new mongoose.Schema({
    projectID: String,
    date: String,
    description: String,
    hours: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

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
    kloks: [KlokSchema]
})

const ProjectSchema = new mongoose.Schema({
    name: String,
    location: String,
    projectID: String,
    projectStart: String,
    active: String,
    projectType: String,
})

const AdminSchema = new mongoose.Schema({
    email: String,
    password: String,
    fullname: String,
    organization: String,
    users: [UserSchema],
    projects: [ProjectSchema],
    kloks: [KlokSchema]
})

const Project = mongoose.model("Project", ProjectSchema)

const User = mongoose.model("User", UserSchema)

const Admin = mongoose.model("Admin", AdminSchema)

const Klok = mongoose.model("Klok", KlokSchema)

module.exports = { Admin, User, Project, Klok }