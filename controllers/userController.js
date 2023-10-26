const User = require('../models/user');
const Klok = require("../models/klok");

User.Promise = global.Promise
Klok.Promise = global.Promise

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { JWT_KEY_SECRET } = require("../config");


// LOGIN - GET
const sendPINForm = (req, res, next) => {
    let entryAccess = false;
    if(req.cookies.usertoken) {
        entryAccess = true
    } 
    res.render('user/login.ejs', {entryAccess})
}

// LOGIN - POST 
const userLogin = async (req, res) => {
    try{
        const user = await User.findOne({ PIN: req.body.PIN })
        if (!user){
            return res.send('user not found')
        }
        const verify = bcrypt.compare(req.body.PIN, user.PIN);
        if (!verify) {
            return res.send("invalid PIN")
        }
        const token = jwt.sign(
            { userId: user.id, PIN: user.PIN },
            JWT_KEY_SECRET,
            { expiresIn: '1hr' }
        );
        return res.cookie('usertoken', token).redirect(`/user/home/${user._id}`)
    } catch (error) {
        console.error(error)
    }
}

// LOGOUT
const userLogout = (req, res, next) => {
    const token = req.cookies.usertoken;    
    if(!token) {
        return res.send('Failed to logout')
    }
    const data = jwt.verify(token, JWT_KEY_SECRET)
    console.log("Logging out now", data)
    return res.clearCookie('usertoken').redirect('/user/login');
}

// USER HOME PAGE
const userHome = async (req, res) => {
    let entryAccess = true
    if (req.cookies.usertoken) {
        const user = await User.findOne({_id: req.params.id})
        const kloks = await Klok.find({user: req.params.id})
        res.render("user/user.ejs", { user, kloks, entryAccess });
    } else {
        res.send("error: no access granted")
    }
}

// CREATE

const createKlok = async (req, res) => {
    let entryAccess = true
    if (req.cookies.usertoken) {
    try {
    const user = await User.findById(req.params.id);

      const newKlok = await Klok.create({
        user: user._id,
        projectID: req.body.projectID,
        date: req.body.date,
        description: req.body.description,
        hours: req.body.hours
      });
      if (user) {
        user.kloks.push(newKlok);
        await user.save();
        res.redirect(`/user/home/${user._id}`);
      } 
      console.log(user.kloks)
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while creating and updating klok.');
    }
    } else {
        res.send("error: no access granted")
    }
};
  

module.exports = {
    sendPINForm,
    userLogin,
    userLogout,
    userHome,
    createKlok
}