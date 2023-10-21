const express = require('express');
const router = express.Router();

const { checkAuth } = require("../middleware/checkauth")

const { 
        // createUser, 
        // findAllUsers, 
        // createProject, 
        // findAllProjects, 
        // adminPageKlok,
        // updateUser,
        // updateProject,
        // deleteUser,
        // deleteProject,
        // createKlok,
        homePage, 
        sendNewAdminForm,      
        sendLoginForm,
        login,
        logout,
        createNewAdmin,
        adminHome
    } = require("../controllers/adminController")




router.get("/", homePage)

router.get("/admin/home", adminHome)

// CREATE
router.get("/admin/new", sendNewAdminForm);

router.post("/admin/signup", createNewAdmin);

//LOGIN
router.get("/admin/login", sendLoginForm);

router.post("/admin/login", login);

//LOGOUT
router.get("/admin/logout", logout);


// // CREATE 
// router.post("/admin/new-user", createUser)

// router.post("/admin/new-project", createProject)


// // READ
// router.get("/admin/all-users", findAllUsers)

// router.get("/admin/all-projects", findAllProjects)


// UPDATE
// router.put("/admin/update-user/", updateUser)

// router.put("/admin/update-project/", updateProject)


// // DELETE
// router.delete("/admin/delete-user/", deleteUser)

// router.delete("/admin/delete-project/", deleteProject)




// USER FUNCTIONS

// router.post("/user/klok", createKlok)




module.exports = router