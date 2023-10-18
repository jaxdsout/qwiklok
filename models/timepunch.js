const mongoose = require("../db/connection");

const PunchSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    projectID: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    description: String,
    date: String,
    hours: Number
})

const TimePunch = mongoose.model("Punch", PunchSchema)

module.exports = TimePunch