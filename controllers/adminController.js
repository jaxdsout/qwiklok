const { User, Admin, Project, Klok } = require('../models/admin');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
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
        const admin = await Admin.create(newAdmin)
        const token = jwt.sign(
            { userId: admin.id, email: admin.email },
            JWT_KEY_SECRET,
            { expiresIn: '1hr' }
            );
        return res.cookie('admintoken', token).redirect(`/admin/home/${admin.id}`)  
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
        return res.cookie('admintoken', token).redirect(`/admin/home/${admin.id}`)
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
            const admin = await Admin.findOne({ _id: req.params.id })
            const users = await User.find({ admin: req.params.id });
            let klokkies = [];
            for (const user of users) {
                klokkies = klokkies.concat(user.kloks)
            }
            console.log(klokkies)
            res.render("admin/admin.ejs", { admin, users, klokkies, entryAccess})
        } else {
            res.send("error: no access granted")
        }
}


// FIND ALLS

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


// CRUD USER

const createUser = async (req, res) => {
    if (req.cookies.admintoken) {
        const requiredFields = ['username', 'fullname', 'PIN', 'startDate', 'position', 'hourlyPay'];
        for(let field of requiredFields) {
        if(!(field in req.body)) {
            const errorMessage = `missing ${field} in request body`;
            return res.send(errorMessage);
        }}
        const { username, fullname, PIN, startDate, position, hourlyPay } = req.body
        if (PIN.length !== 5 || isNaN(PIN)){
            return res.send("PIN must be 5 digits long");
        }
        try {
            const newUser = { username, fullname, PIN, startDate, position, hourlyPay }
            const user = await User.create(newUser)
            const admin = await Admin.findOne({ id: req.params.id })
            if (admin) {
                user.admin = admin._id;
                await user.save();
                admin.users.push(user);
                await admin.save();
                const token = jwt.sign(
                    { userId: user.id, PIN: user.PIN },
                    JWT_KEY_SECRET,
                    { expiresIn: '1hr' }
                    );
                return res.cookie('admintoken', token).redirect(`/admin/home/${admin.id}`)  
            } 
        } catch (error) {
            console.error(error)
        } 
} else {
    res.send("error: no access granted")
}
}

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


// CRUD PROJECT

const createProject = async (req, res) => {
    if (req.cookies.admintoken) {
        const requiredFields = ['name', 'location', 'projectID', 'projectStart', 'active', 'projectType'];
        for(let field of requiredFields) {
        if(!(field in req.body)) {
            const errorMessage = `missing ${field} in request body`;
            return res.send(errorMessage);
        }}
        const { name, location, projectID, projectStart, active, projectType } = req.body
        try {
            const newProj = { name, location, projectID, projectStart, active, projectType }
            const project = await Project.create(newProj)
            const admin = await Admin.findOne({ id: req.params.id })
            if (admin) {
                project.admin = admin._id;
                await project.save();
                admin.projects.push(project);
                await admin.save();
                return res.redirect(`/admin/home/${admin.id}`)  
            } 
        } catch (error) {
            console.error(error)
        } 
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


// CRUD KLOK

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