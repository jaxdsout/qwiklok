const User = require('../models/user');
const Klok = require("../models/klok")

const homePage = (req, res) => {
    res.render("home")
}

const userProfile = async (req, res) => {
    const user = await User.findById(req.params._id)
    res.render("user", { user })
}

const loginUser = async (req, res) => {
    try{
        const userPIN = req.body.PIN;
        const user = await User.findOne({ PIN: userPIN });
        if (user) {
            res.redirect(`/user/${user._id}`)  
        } else {
            res.send('User not found')
        }
        res.send({ user }) 
    } catch(e) {
    }
}

const createKlok = async (req, res) => {
    const user = await User.findOne(req.params._id)
    const newKlok = await Klok.create({
        user: user._id,
        projectID: req.body.projectID,
        date: req.body.date,
        description: req.body.description,
        hours: req.body.hours
    });
    console.log(newKlok)
    res.redirect(`/user/${user._id}`)
}

module.exports = {
    createKlok,
    loginUser,
    homePage,
    userProfile
}

