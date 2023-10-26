const { User, Klok, Project, Admin } = require('../models/admin');

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
        const kloks = user.kloks
        const availProj = await Admin.findOne({_id: user.admin._id})
        const projects = availProj.projects
        res.render("user/user.ejs", { user, kloks, projects, entryAccess });
    } else {
        res.send("error: no access granted")
    }
}

// CREATE

const createKlok = async (req, res) => {
    if (req.cookies.usertoken) {
        const requiredFields = ['projectID', 'date', 'hours', 'description'];
        for (let field of requiredFields) {
            if(!(field in req.body)) {
            const errorMessage = `missing ${field} in request body`;
            return res.send(errorMessage);
        }}
        const user = await User.findById(req.params.id);
        const klok = await Klok.create({
            user: user._id,
            projectID: req.body.projectID,
            date: req.body.date,
            description: req.body.description,
            hours: req.body.hours
        })
        if (user) {
            user.kloks.push(klok);
            await user.save();
            res.redirect(`/user/home/${user._id}`);
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