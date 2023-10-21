const mongoose = require("../db/connection");

const ProjSchema = new mongoose.Schema({
    name: String,
    location: String,
    projectID: String,
    startDate: String,
    active: Boolean,
    projectType: String,
    workers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})

const Project = mongoose.model("Project", ProjSchema)

module.exports = Project