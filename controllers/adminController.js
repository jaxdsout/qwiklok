const User = require('../models/user');
const Admin = require('../models/admin');
const Project = require('../models/project');
const Klok = require("../models/klok");

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const cookieParser = require('cookie-parser')

const { JWT_KEY_SECRET } = require("../config")


const homePage = (req, res) => {
    res.render("home")

}

// NEW - SEND FORM
const sendNewAdminForm = (req, res, next) => {
    let accessGranted = false
    if(req.cookies.access_token) {
        accessGranted = true
    } 
    res.render('admin/newadmin.ejs', {accessGranted})
}

// NEW - POST NEW ADMIN
const createNewAdmin = (req, res, next) => {
    const requiredFields = ['email', 'password', 'fullname', 'organization', 'username'];

    for(let i=0; i < requiredFields.length; i++) {
        const field = requiredFields[i]
        if(!(field in req.body)) {
            const errorMessage = `missing ${field} in request body`;
            return res.send(errorMessage);
    }}

    req.body.email = req.body.email.toLowerCase()
    const { email, password, fullname, organization, username } = req.body

    bcrypt.hash(password, 12)
        .then(encryptedPw => {
            const newAdmin = { 
                email, password: encryptedPw, fullname, organization, username }
            Admin.create(newAdmin)
                .then(admin => {
                    const token = jwt.sign(
                        { userId: admin.id, email: admin.email },
                        JWT_KEY_SECRET)
                        return res.cookie('access_token', token).redirect('/admin/login')  
                })
    })
}



// LOGIN - GET
const sendLoginForm = (req, res, next) => {
    let accessGranted = false
    if(req.cookies.access_token) {
        accessGranted = true
    } 
    res.render('admin/login.ejs', {accessGranted})
}

// LOGIN - POST 
const adminLogin = (req, res) => {
    req.body.email.toLowerCase();
    Admin.findOne({ email: req.body.email })
        .then((admin) => {
            if (!admin){
                return res.send('email not found')
            }
            bcrypt.compare(req.body.password, admin.password)
                .then((matched) => {
                    if (matched === false) {
                        return res.send('invalid password, try again')
                    }
                    const token = jwt.sign(
                        { userId: admin.id, email: admin.email },
                        JWT_KEY_SECRET)
                    return res.cookie('accesstoken', token)
                        .redirect("/admin/home")
                })
        })
}

// LOGOUT
const adminLogout = (req, res, next) => {
    const token = req.cookies.accesstoken;
    if(!token) {
        return res.send('Failed to logout')
    }
    const data = jwt.verify(token, JWT_KEY_SECRET)
    console.log("Logging out now")
    return res.clearCookie('access_token')
        .redirect('/admin/login');
}



// ADMIN HOME PAGE
const adminHome = async (req, res) => {
    let accessGranted = false
    if(req.cookies.access_token) {
        accessGranted = true
    } 
    const kloks = await Klok.find({});
    const users = await User.find({});
    const projects = await Project.find({});
    res.render("admin/admin.ejs", { users, projects, kloks, accessGranted})
}



// CREATE NEW USER

const createUser = async (req, res) => {
    const requiredFields = ['username', 'fullname', 'PIN', 'startDate', 'position', 'hourlyPay'];
    for(let i=0; i < requiredFields.length; i++) {
        const field = requiredFields[i]
        if(!(field in req.body)) {
            const errorMessage = `missing ${field} in request body`;
            return res.send(errorMessage);
    }}
    req.body.username = req.body.username.toLowerCase()
    const { username, fullname, PIN, startDate, position, hourlyPay } = req.body
    bcrypt.hash(PIN, 12)
        .then(encryptedPIN => {
            const userParams = { 
                username, fullname,
                PIN: encryptedPIN, 
                startDate, position, hourlyPay
            }
            User.create(userParams)
                .then(user => {
                    const token = jwt.sign(
                        { userId: user.id, PIN: user.PIN },
                        JWT_KEY_SECRET, 
                    )
                    return res.cookie('access_token', token).redirect('/admin/home')
                        
            })
        }
        )
}


const createKlokAdmin = async (req, res) => {
    const newKlok = await Klok.create(req.body)
    res.redirect("/admin/home", { newKlok })
}


const createProject = async (req, res) => {
    const newProj = await Project.create(req.body)
    res.redirect("/admin/home/", { newProj })
}





// READ

const findAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json({
        "data": users,
        "status": 200
        })
    }
    catch (error) {
      next(error);
    }
}


const findAllProjects = async (req, res) => {
    try {
        const projects = await Project.find()
        res.json({
        "data": projects,
        "status": 200
        })
    }
    catch (error) {
      next(error);
    }
}


// // UPDATE

const  updateUserForm = async (req, res) => {
    const user = await User.findOne({_id: req.params.id});
    res.render("admin/edituser", { user })
}

const updateUser = async (req, res) => {
    const user = await User.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body},
        { new: true }
        )
        console.log(user);
        res.redirect("/admin/home")
}

const  updateProjectForm = async (req, res) => {
    const project = await Project.findOne({_id: req.params._id});
    res.render("admin/editproject", { project })
}

const updateProject = async (req, res) => {
    const user = await Project.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body},
        { new: true }
        )
        console.log(user);
        res.redirect("/admin/update-user/:id")
}

const  updateKlokForm = async (req, res) => {
    const klok = await Klok.findOne({ _id:req.params._id });
    res.render("admin/editklok", { klok })
}

const updateKlok = async (req, res) => {
    const klok = await Klok.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body},
        { new: true }
        )
        console.log(klok);
        res.redirect("/admin/home")
}

// // DELETE

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (deleteUser) {
            console.log("Deleted Project:", deleteUser);
            res.redirect("/admin/home");
        } else {
            res.status(404).send("User not found.");
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

const deleteProject = async (req, res) => {
    try {
        const deletedProj = await Project.findByIdAndDelete(req.params.id);
        if (deleteProject) {
            console.log("Deleted Project:", deletedProj);
            res.redirect("/admin/home");
        } else {
            res.status(404).send("Project not found.");
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

const deleteKlok = async (req, res) => {
    try {
        const deletedKlok = await Klok.findByIdAndDelete(req.params.id);
        if (deleteKlok) {
            console.log("Deleted Klok:", deletedKlok);
            res.redirect("/admin/home");
        } else {
            res.status(404).send("Klok not found.");
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    createUser,
    createProject,
    createKlokAdmin,
    findAllUsers,
    findAllProjects,
    updateUser,
    updateUserForm,
    updateProject,
    deleteUser,
    deleteProject,
    adminLogin,
    adminLogout,
    homePage,
    sendLoginForm,
    sendNewAdminForm,
    createNewAdmin,
    adminHome,
    updateProjectForm,
    updateKlok,
    updateKlokForm,
    deleteKlok
}