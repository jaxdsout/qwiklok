const express = require('express');
const router = express.Router();

const { adminAuth } = require("../middleware/authenticator")

const { 
    sendNewAdminForm, sendLoginForm, createNewAdmin, adminHome, adminLogin, adminLogout,    
    findAllUsers, findAllProjects,
    createUser, updateUser, 
    deleteUser,
    createProject, updateProject, deleteProject, updateKlok, deleteKlok
} = require("../controllers/adminController")



// --------------- ADMIN LOGIN & SETUP

router.get("/login", sendLoginForm);

router.post("/login", adminLogin);

router.get("/logout", adminLogout);

router.get("/home/:id", adminHome)

router.get("/new", sendNewAdminForm);

router.post("/signup", createNewAdmin)


// FIND ALL USERS & PROJECTS {POSTMAN}

router.get("/find-user/all", findAllUsers)

router.get("/find-projects/all", findAllProjects)
 



// router.use(adminAuth) /* ----------- AUTHENTICATOR*/




// ADMIN CRUD -- USER

router.post("/new-user", createUser)

// router.get("/edit-user/:id", updateUserForm)

router.put("/edit-user/:id", updateUser)

router.delete("/edit-user/:id/delete", deleteUser)


// ADMIN CRUD -- PROJECT

router.post("/new-project", createProject)

router.put("/edit-project/:id", updateProject)

router.delete("/edit-project/:id/delete", deleteProject)


// ADMIN CRUD -- KLOK

router.put("/edit-klok/:id", updateKlok)

router.delete("/edit-klok/:id/delete", deleteKlok)


module.exports = router