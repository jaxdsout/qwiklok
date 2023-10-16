const mongoose = require("mongoose");

const projSchema = mongoose.Schema({
    name: String,
    location: String,
    active: Boolean,
    projectType: String,
    startDate: String,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
})

const Project = mongoose.model("User", projSchema)

module.exports = { Project }