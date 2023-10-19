const User = require('../models/user');

const adminPage = (req, res) => {
    res.render("admin")
}

const contractorPage = (req, res) => {
    res.render("contractor")
}

const indexPage = (req, res) => {
    res.render("index")
}

module.exports = {
    adminPage,
    contractorPage,
    indexPage
}

