const express = require('express');
const router = express.Router();

// const { checkAuth } = require("../middleware/checkauth")

const { 
        createUser, 
        findAllUsers, 
        updateUser,
        updateUserForm,
        deleteUser,
        createProject, 
        findAllProjects, 
        updateProject,
        deleteProject,
        updateProjectForm,
        sendNewAdminForm,      
        sendLoginForm,
        createNewAdmin,
        adminHome,
        adminLogin,
        adminLogout,
        createKlokAdmin,
        updateKlokForm,
        updateKlok,
        deleteKlok
    } = require("../controllers/adminController")


const {
    sendPINForm,
    userLogin,
    userLogout,
    userHome,
    createKlok
} = require("../controllers/userController")

router.get("/", sendPINForm)


// ADMIN

router.get("/admin/home", adminHome)

// CREATE
router.get("/admin/new", sendNewAdminForm);

router.post("/admin/signup", createNewAdmin);

//LOGIN
router.get("/admin/login", sendLoginForm);

router.post("/admin/login", adminLogin);

//LOGOUT
router.get("/admin/logout", adminLogout);


// // CREATE 
router.post("/admin/new-user", createUser)

router.post("/admin/new-project", createProject)

router.post("/admin/new-klok", createKlokAdmin)


// // READ
router.get("/admin/find-user/all", findAllUsers)

router.get("/admin/find-projects/all", findAllProjects)


// READ, UPDATE & DELETE USER
router.get("/admin/edit-user/:id", updateUserForm)

router.put("/admin/edit-user/:id", updateUser)

router.delete("/admin/edit-user/:id/delete", deleteUser)


// READ, UPDATE & DELETE PROJECT
router.get("/admin/edit-project/:id", updateProjectForm)

router.put("/admin/edit-project/:id", updateProject)

router.delete("/admin/edit-project/:id/delete", deleteProject)

// READ, UPDATE & DELETE KLOK
router.get("/admin/edit-klok/:id", updateKlokForm)

router.put("/admin/edit-klok/:id", updateKlok)

router.delete("/admin/edit-klok/:id/delete", deleteKlok)



// USER FUNCTIONS

router.get("/user/login", sendPINForm)

router.post("/user/login", userLogin)

router.get("/user/logout", userLogout);

router.get("/user/home/:id", userHome)

router.post("/user/home/:id/klok", createKlok)




module.exports = router