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


// --------------- USER LOGIN

router.get("/user/login", sendPINForm)

router.post("/user/login", userLogin)

router.get("/user/logout", userLogout);

router.get("/user/home/:id", userHome)


// --------------- ADMIN LOGIN & SETUP

router.get("/admin/login", sendLoginForm);

router.post("/admin/login", adminLogin);

router.get("/admin/logout", adminLogout);

router.get("/admin/home", adminHome)

router.get("/admin/new", sendNewAdminForm);

router.post("/admin/signup", createNewAdmin)


// FIND ALL USERS & PROJECTS {POSTMAN}

router.get("/admin/find-user/all", findAllUsers)

router.get("/admin/find-projects/all", findAllProjects)
 


// router.use(checkAuth) /* ----------- AUTHENTICATOR*/


// USER KLOK

router.post("/user/home/:id/klok", createKlok)


// ADMIN CRUD -- USER

router.post("/admin/new-user", createUser)

router.get("/admin/edit-user/:id", updateUserForm)

router.put("/admin/edit-user/:id", updateUser)

router.delete("/admin/edit-user/:id/delete", deleteUser)


// ADMIN CRUD -- PROJECT

router.post("/admin/new-project", createProject)

router.get("/admin/edit-project/:id", updateProjectForm)

router.put("/admin/edit-project/:id", updateProject)

router.delete("/admin/edit-project/:id/delete", deleteProject)


// ADMIN CRUD -- KLOK

router.post("/admin/new-klok", createKlokAdmin)

router.get("/admin/edit-klok/:id", updateKlokForm)

router.put("/admin/edit-klok/:id", updateKlok)

router.delete("/admin/edit-klok/:id/delete", deleteKlok)




module.exports = router
