const User = require('../models/user');
const Admin = require('../models/admin');
const Project = require('../models/project');
const Klok = require("../models/klok");

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')

const { JWT_KEY_SECRET } = require("../config");
const { urlencoded } = require('body-parser');




// LOGIN - GET
const sendPINForm = (req, res, next) => {

    let isLoggedIn = false

    if(req.cookies.access_token) {
        isLoggedIn = true
    } 
    
    res.render('user/login.ejs', {isLoggedIn})

}


// LOGIN - POST 
const userLogin = (req, res) => {
    User.findOne({ PIN: req.body.PIN })
        .then((user) => {
            console.log(user.fullname, "found")
            if (!user){
                return res.send('PIN not found')
            }
            bcrypt.compare(req.body.PIN, user.PIN)
                .then(() => {
                    const token = jwt.sign(
                        { user, PIN: user.PIN },
                        JWT_KEY_SECRET,
                    )
                    console.log("logging in now")
                    return res.cookie('accesstoken', token)
                        .redirect(`/user/home/`)
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
    // console.log(req.user);
    // const userId = req.user.id;
    // if (!userId) {
    //   console.log("no cookie found!");
    //   return res.redirect("/user/login");
    // }
    // const token = req.cookies.access_token
    // const decodedToken = jwt.verify(token, JWT_KEY_SECRET)
  
    // User.findById(userId).then((usr) => {
    //   if (!usr) {
    //     console.log("access denied, user does not exist");
    //     res.redirect("/user/login");
    //   } else {
    //     if (req.cookies.access_token) {
    //       isLoggedIn = true;
    //     }
    //     console.log("access granted, you may create a story");
    const user = await User.findById(req.params.id)
    console.log(user)
        res.render("user/user.ejs", { user });
      }
//     });
// }


// CREATE

const createKlok = async (req, res) => {
    const newKlok = await Klok.create({
        user: req.params._id,
        projectID: req.body.projectID,
        date: req.body.date,
        description: req.body.description,
        hours: req.body.hours
    })
    console.log(newKlok._id, "klok'd")
    res.redirect("/user/home")
}


module.exports = {
    sendPINForm,
    userLogin,
    userLogout,
    userHome,
    createKlok
}