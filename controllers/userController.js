const User = require('../models/user');
const Admin = require('../models/admin');
const Project = require('../models/project');
const Klok = require("../models/klok");

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
// const cookieParser = require('cookie-parser')

const { JWT_KEY_SECRET } = require("../config");
// const { urlencoded } = require('body-parser');


// LOGIN - GET
const sendPINForm = (req, res, next) => {
    let accessGranted = false
    if(req.cookies.access_token) {
        accessGranted = true
    } 
    res.render('user/login.ejs', {accessGranted})
}


// LOGIN - POST 
const userLogin = (req, res) => {
    req.body.username.toLowerCase();
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (!user){
                return res.send('PIN not found')
            }
            bcrypt.compare(req.body.PIN, user.PIN)
                .then((matched) => {
                  if (matched === false) {
                    return res.send('invalid PIN, try again')
                    }
                    const token = jwt.sign(
                        { userId: user.id, PIN: user.PIN },
                        JWT_KEY_SECRET)
                    console.log("logging in now", user.fullname)
                    return res.cookie('accesstoken', token)
                        .redirect(`/user/home/${user._id}`)
                })
    })
}

// LOGOUT
const userLogout = (req, res, next) => {
    const token = req.cookies.accesstoken;    
    if(!token) {
        return res.send('Failed to logout')
    }
    const data = jwt.verify(token, JWT_KEY_SECRET)
    console.log("Logging out now")
    return res.clearCookie('access_token')
        .redirect('/user/login');
}


// USER HOME PAGE
const userHome = async (req, res) => {
        const user  = await User.findOne({_id: req.params.id})
        res.render("user/user.ejs", { user });
}

// CREATE

const createKlok = async (req, res) => {
    try {
      const newKlok = await Klok.create({
        user: req.params.id,
        projectID: req.body.projectID,
        date: req.body.date,
        description: req.body.description,
        hours: req.body.hours
      });
      console.log(newKlok)
      const user = await User.findById(req.params.id);
      console.log(user)
      if (user) {
        user.kloks.push(newKlok._id);
        await user.save();
      } else {
      }
      res.redirect(`/user/home/${user._id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while creating and updating klok.');
    }
};
  


module.exports = {
    sendPINForm,
    userLogin,
    userLogout,
    userHome,
    createKlok
}

