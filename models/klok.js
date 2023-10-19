const mongoose = require("../db/connection");

const KlokSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    projectID: String,
    date: String,
    description: String,
    hours: Number
})

const QwiKlok = mongoose.model("QwiKlok", KlokSchema)

module.exports = QwiKlok