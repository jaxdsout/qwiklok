const express = require('express');
const router = express.Router();

const { checkAuth } = require("../middleware/checkauth")

const { 
        createUser, 
        findAllUsers, 
        createProject, 
        findAllProjects, 
        updateUser,
        updateUserForm,
        updateProject,
        deleteUser,
        deleteProject,
        // createKlokAdmin,
        updateProjectForm,
        homePage, 
        sendNewAdminForm,      
        sendLoginForm,
        createNewAdmin,
        adminHome,
        adminLogin,
        adminLogout
    } = require("../controllers/adminController")


const {
    sendPINForm,
    userLogin,
    userLogout,
    userHome,
    createKlok
} = require("../controllers/userController")

router.get("/", homePage)


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


// // READ
router.get("/admin/find-user/all", findAllUsers)

router.get("/admin/find-projects/all", findAllProjects)


// UPDATE
router.get("/admin/edit-user/:id", updateUserForm)

router.put("/admin/edit-user/:id", updateUser)

router.get("/admin/edit-project/:id", updateProjectForm)

router.put("/admin/edit-project/:id", updateProject)



// // DELETE
router.delete("/admin/delete-user/", deleteUser)

router.delete("/admin/delete-project/", deleteProject)




// USER FUNCTIONS

router.get("/user/login", sendPINForm)

router.post("/user/login", userLogin)

router.get("/user/logout", userLogout);

router.get("/user/home/", userHome)

router.post("/user/klok", createKlok)




module.exports = router