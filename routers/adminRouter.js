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
    } = require("../controllers/adminController")

router.get("/", adminPage) 

router.get("/modify-user", adminPageUser)

router.get("/modify-project", adminPageProject)

router.get("/modify-klok", adminPageKlok)

router.post("/new-user", createUser)

router.post("/new-project", createProject)

router.get("/all-users", findAllUsers)

router.get("/all-projects", findAllProjects)

router.put("/user/:id", updateUser)

router.put("/update-project", updateProject)



module.exports = router