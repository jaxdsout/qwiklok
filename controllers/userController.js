const User = require('../models/user');
const Klok = require("../models/klok")

const homePage = (req, res) => {
    res.render("home")
}

const userProfile = (req, res) => {
    res.render("user")
}

const loginUser = async (req, res) => {
    try{
        const userPIN = req.body.PIN;
        const user = await User.findOne({ PIN: userPIN });
        if (user) {
            res.render("user", { user } )
        } else {
            res.send('User not found')
        }
    } catch(e) {
    }
}

const createKlok = async (req, res) => {
    const newKlok = await Klok.create({
        user: req.params._id,
        projectID: req.body.projectID,
        date: req.body.date,
        description: req.body.description,
        hours: req.body.hours
    });
    
    console.log(newKlok)
    res.redirect("/user")
}

module.exports = {
    createKlok,
    loginUser,
    homePage,
    userProfile
}

