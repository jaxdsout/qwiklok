const User = require('../models/user');
const Admin = require('../models/admin');
const Project = require('../models/project');
const Klok = require("../models/klok");

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const cookieParser = require('cookie-parser')

const { JWT_KEY_SECRET } = require("../config")

// NEW - SEND FORM
const sendNewAdminForm = (req, res, next) => {
    let entryAccess = false
    if(req.cookies.admintoken) {
        entryAccess = true
    } 
    res.render('admin/newadmin.ejs', {entryAccess})
}



// // NEW - POST NEW ADMIN
const createNewAdmin = async (req, res) => {
    const requiredFields = ['email', 'password', 'fullname', 'organization'];
    for(let field of requiredFields) {
        if(!(field in req.body)) {
            const errorMessage = `missing ${field} in request body`;
            return res.send(errorMessage);
    }}
    req.body.email = req.body.email.toLowerCase()
    const { email, password, fullname, organization } = req.body
    try {
        const encryptedPw = await bcrypt.hash(password, 12)
        const newAdmin = { email, password: encryptedPw, fullname, organization }
        const admin = Admin.create(newAdmin)
        const token = jwt.sign(
            { userId: admin.id, email: admin.email },
            JWT_KEY_SECRET,
            { expiresIn: '1hr' }
            );
        return res.cookie('admintoken', token).redirect('/admin/home')  
    } catch (error) {
        console.error(error)
    }
}


// LOGIN - GET
const sendLoginForm = (req, res, next) => {
    let entryAccess = false;
    if(req.cookies.admintoken) {
        entryAccess = true
    } 
    res.render('admin/login.ejs', {entryAccess})
}

// LOGIN - POST 
const adminLogin = async (req, res, next) => {
    try{
        req.body.email.toLowerCase();
        const admin = await Admin.findOne({ email: req.body.email })
        console.log({ email: req.body.email })
        if (!admin){
            return res.send('email not found')
        }
        const verify = bcrypt.compare(req.body.password, admin.password);
        if (!verify) {
            return res.send("invalid password")
        }
        const token = jwt.sign(
            { userId: admin.id, email: admin.email },
            JWT_KEY_SECRET,
            { expiresIn: '1hr' }
        );
        return res.cookie('admintoken', token).redirect("/admin/home")
    } catch (error) {
        console.error(error)
    }
}

// LOGOUT
const adminLogout = (req, res, next) => {
    const token = req.cookies.admintoken;
    if(!token) {
        entryAccess = false
        return res.send('Failed to logout')
    }
    const data = jwt.verify(token, JWT_KEY_SECRET)
    console.log("Logging out now", data)
    return res.clearCookie('admintoken').redirect('/admin/login');
}



// ADMIN HOME PAGE
const adminHome = async (req, res) => {
        let entryAccess = false;
        if (req.cookies.admintoken) {
            entryAccess = true
            const kloks = await Klok.find({});
            const users = await User.find({});
            const projects = await Project.find({});
            res.render("admin/admin.ejs", { users, projects, kloks, entryAccess})
        } else {
            res.send("error: no access granted")
        }
}



// CREATE NEW USER
const createUser = async (req, res) => {
    let entryAccess = req.cookies.admintoken
    if (entryAccess) {
        const requiredFields = ['username', 'fullname', 'PIN', 'startDate', 'position', 'hourlyPay'];
        for(let field of requiredFields) {
        if(!(field in req.body)) {
            const errorMessage = `missing ${field} in request body`;
            return res.send(errorMessage);
        }}
        const { username, fullname, PIN, startDate, position, hourlyPay } = req.body
        try {
            const newUser = { username, fullname, PIN, startDate, position, hourlyPay }
            const user = User.create(newUser)
            const token = jwt.sign(
                { userId: user.id, PIN: user.PIN },
                JWT_KEY_SECRET,
                { expiresIn: '1hr' }
                );
            return res.cookie('admintoken', token).redirect('/admin/home')  
        } catch (error) {
            console.error(error)
        } 
} else {
    res.send("error: no access granted")
}
}



const createKlokAdmin = async (req, res) => {
    let entryAccess = req.cookies.admintoken
    if (entryAccess) {
        const newKlok = await Klok.create(req.body)
        res.redirect("/admin/home", { newKlok })
    } else {
        res.send("error: no access granted")
    }
}


const createProject = async (req, res) => {
    let entryAccess = !req.cookies.admintoken
    if (!entryAccess) {
    const newProj = await Project.create(req.body)
    res.redirect("/admin/home/", { newProj })
    } else {
        res.send("error: no access granted")
    }
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
    let entryAccess = !req.cookies.admintoken
    if (!entryAccess) {
        const user = await User.findOne({_id: req.params.id});
        res.render("admin/edituser", { user, entryAccess })
    } else {
        res.send("error: no access granted")
    }
    
}

const updateUser = async (req, res) => {
    let entryAccess = !req.cookies.admintoken
    if (!entryAccess) {
    const user = await User.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body},
        { new: true }
        )
        console.log(user);
        res.redirect("/admin/home")
    } else {
        res.send("error: no access granted")
    }
}

const  updateProjectForm = async (req, res) => {
    let entryAccess = !req.cookies.admintoken
    if (!entryAccess) {
        const project = await Project.findOne({_id: req.params.id});
        res.render("admin/editproject", { project, entryAccess })
    }  else {
        res.send("error: no access granted")
    }
}

const updateProject = async (req, res) => {
    let entryAccess = !req.cookies.admintoken
    if (!entryAccess) {
    const user = await Project.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body},
        { new: true }
        )
        console.log(user);
        res.redirect("/admin/update-user/:id")
    } else {
        res.send("error: no access granted")
    }
}

const  updateKlokForm = async (req, res) => {
    let entryAccess = !req.cookies.admintoken
    if (!entryAccess) {
        const klok = await Klok.findOne({ _id:req.params._id });
        res.render("admin/editklok", { klok })
    } else {
        res.send("error: no access granted")
    }
}

const updateKlok = async (req, res) => {
    let entryAccess = !req.cookies.admintoken
    if (!entryAccess) {
    const klok = await Klok.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body},
        { new: true }
        )
        console.log(klok);
        res.redirect("/admin/home")
    } else {
        res.send("error: no access granted")
    }
}

// // DELETE

const deleteUser = async (req, res) => {
    let entryAccess = !req.cookies.admintoken
    if (!entryAccess) {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        console.log("Deleted User:", deleteUser);
        res.redirect("/admin/home");
    } else {
        res.send("error: no access granted")
    }
}    

const deleteProject = async (req, res) => {
    let entryAccess = !req.cookies.admintoken
    if (!entryAccess) {
        const deletedProj = await Project.findByIdAndDelete(req.params.id);
        console.log("Deleted Project:", deletedProj);
        res.redirect("/admin/home");
    } else {
        res.send("error: no access granted")
}
}

const deleteKlok = async (req, res) => {
    let entryAccess = !req.cookies.admintoken
    if (!entryAccess) {
        const deletedKlok = await Klok.findByIdAndDelete(req.params.id);
        console.log("Deleted Klok:", deletedKlok);
        res.redirect("/admin/home");
    } else {
        res.send("error: no access granted")
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
    sendLoginForm,
    sendNewAdminForm,
    createNewAdmin,
    adminHome,
    updateProjectForm,
    updateKlok,
    updateKlokForm,
    deleteKlok
}