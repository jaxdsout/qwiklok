const express = require('express');
const router = express.Router();

const { createUser, 
        findAllUsers, 
        createProject, 
        findAllProjects, 
        adminPage, 
        adminPageProject, 
        adminPageUser, 
        adminPageKlok,
        updateUser,
        updateProject,
        editUserPage,
        editProjectPage,
        deleteUser,
        deleteProject
    } = require("../controllers/adminController")

// PAGES

router.get("/", adminPage) 

router.get("/modify-user", adminPageUser)

router.get("/modify-project", adminPageProject)

router.get("/modify-klok", adminPageKlok)

router.get("/modify-user/:id", editUserPage)

router.get("/modify-project/:id", editProjectPage)


// CREATE 
router.post("/new-user", createUser)

router.post("/new-project", createProject)


// READ
router.get("/all-users", findAllUsers)

router.get("/all-projects", findAllProjects)


// UPDATE
router.put("/modify-user/updated", updateUser)

router.put("/modify-project/updated", updateProject)


// DELETE
router.delete("/modify-user/deleted", deleteUser)

router.delete("/modify-project/deleted", deleteProject)



module.exports = router