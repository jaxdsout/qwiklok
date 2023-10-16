const mongoose = require("mongoose");

const punchSchema = mongoose.Schema({
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

const TimePunch = mongoose.model("User", punchSchema)

module.exports = { TimePunch }