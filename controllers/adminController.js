const User = require('../models/user');
const Admin = require('../models/admin');
const Project = require('../models/project');
const Klok = require("../models/klok");

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const { JWT_KEY_SECRET } = require("../config")


const homePage = (req, res) => {
    res.render("home")

}

// NEW - SEND FORM
const sendNewAdminForm = (req, res, next) => {

    let isLoggedIn = false

    if(req.cookies.access_token) {
        isLoggedIn = true
    } 
    res.render('admin/newadmin.ejs', {isLoggedIn})

}

// NEW - POST NEW ADMIN
const createNewAdmin = (req, res, next) => {
    console.log('Posting New Admin');

    const requiredFields = ['username', 'email', 'fullname', 'password'];

    for(let i=0; i < requiredFields.length; i++) {
        const field = requiredFields[i]
        if(!(field in req.body)) {
            const errorMessage = `missing ${field} in request body`;
            console.error(errorMessage);
            return res.send(errorMessage);
        }
    }

    req.body.email = req.body.email.toLowerCase()
    console.log(req.body)

    const { firstName, lastName, email, password } = req.body

    //hashing the password with bcrypt
    bcrypt.hash(password, 12) //anything higher than 20 would take days to encrypt and decrypt
        .then(encryptedPw => {
            console.log(`Finished encrypting password: ${encryptedPw}`)
            const newAdmin = { firstName, lastName, email, password: encryptedPw }

            Admin.create(newAdmin)
                .then(admin => {
                    const token = jwt.sign(
                        { userId: admin.id, email: admin.email }, //payload
                        JWT_KEY_SECRET, //server secret
                        // { expiresIn: '1hr' }
                    )
                        // const response = { user: usr, token }
                        // return res.send(response)

                        return res.cookie('access_token', token).redirect('/admin/login')
                        
                })
        })

}



// LOGIN - GET
const sendLoginForm = (req, res, next) => {

    let isLoggedIn = false

    if(req.cookies.access_token) {
        isLoggedIn = true
    } 
    
    res.render('admin/login.ejs', {isLoggedIn})

}

// LOGIN - POST 
const login = (req, res) => {
    req.body.email.toLowerCase();
    
    Admin.findOne({ email: req.body.email })
        .then((admin) => {
            console.log(admin)
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
                        JWT_KEY_SECRET,
                    )
                    console.log(token)
                    return res.cookie('accesstoken', token)
                        .redirect("/admin/home")
                })
        })
}

// LOGOUT
const logout = (req, res, next) => {
    console.log('Is my logout working?')
    const token = req.cookies.accesstoken;
    console.log(token)
    
    if(!token) {
        return res.send('Failed to logout')
    }

    const data = jwt.verify(token, JWT_KEY_SECRET)
    console.log(data)
    
    return res.clearCookie('access_token')
        .redirect('/');
}



const adminHome = (req, res) => {
    res.render("admin/admin.ejs")
}



// CREATE

// const createUser = async (req, res) => {
//     const newUser = await User.create(req.body)
//     console.log(newUser);
//     res.redirect("/user/admin/modify-user")
// }


// const createKlok = async (req, res) => {
//     const newKlok = await Klok.create({
//         user: req.params._id,
//         projectID: req.body.projectID,
//         date: req.body.date,
//         description: req.body.description,
//         hours: req.body.hours
//     })
//     console.log(newKlok)
//     res.redirect("/user/:id")
// }


// const createProject = async (req, res) => {
//     const newProj = await Project.create(req.body)
//     console.log(newProj);
//     res.redirect("/user/admin/modify-project")
// }





// READ

// const findAllUsers = async (req, res) => {
//     try {
//         const users = await User.find()
//         res.json({
//         "data": users,
//         "status": 200
//         })
//     }
//     catch (error) {
//       next(error);
//     }
// }


// const findAllProjects = async (req, res) => {
//     try {
//         const projects = await Project.find()
//         res.json({
//         "data": projects,
//         "status": 200
//         })
//     }
//     catch (error) {
//       next(error);
//     }
// }


// // UPDATE

// const updateUser = async (req, res) => {
//     const user = await User.findOneAndUpdate(
//         {_id: req.params.id},
//         {$set: req.body},
//         { new: true }
//         )
//         console.log(user);
//         res.redirect("/admin/modify-user")
// }

// const updateProject = async (req, res) => {
//     const user = await Project.findOneAndUpdate(
//         {_id: req.params.id},
//         {$set: req.body},
//         { new: true }
//         )
//         console.log(user);
//         res.redirect("/admin/update-user/:id")
// }

// // DELETE

// const deleteUser = async (req, res) => {
//     try {
//         const deletedUser = await User.findByIdAndDelete(req.params._id);
//         if (deleteUser) {
//             console.log("Deleted User:", deletedUser);
//             res.redirect("/admin/modify-user");
//         } else {
//             console.log("User not found.");
//             res.status(404).send("User not found.");
//         }
//     } catch (error) {
//         console.error("Error deleting User:", error);
//         res.status(500).send("Internal Server Error");
//     }
// }

// const deleteProject = async (req, res) => {
//     try {
//         const deletedProj = await Project.findByIdAndDelete(req.params.id);
//         if (deleteProject) {
//             console.log("Deleted Project:", deletedProj);
//             res.redirect("/admin/modify-project");
//         } else {
//             console.log("Project not found.");
//             res.status(404).send("Project not found.");
//         }
//     } catch (error) {
//         console.error("Error deleting Project:", error);
//         res.status(500).send("Internal Server Error");
//     }
// }

module.exports = {
    // createUser,
    // createProject,
    // createKlok,
    // findAllUsers,
    // findAllProjects,
    // updateUser,
    // updateProject,
    // deleteUser,
    // deleteProject,
    login,
    logout,
    homePage,
    sendLoginForm,
    sendNewAdminForm,
    createNewAdmin,
    adminHome
}

