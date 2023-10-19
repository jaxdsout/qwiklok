// ROOT IS "/user"

const express = require('express');
const router = express.Router();

const { adminPage, adminPageUser, adminPageProject, userPage, userLogin, createUser, findAllUsers, createProject, findAllProjects } = require("../controllers/userController")

// router.get("/", userPage)

// router.get("/login", userLogin)

router.post("/admin/new-user", createUser)

router.post("/admin/new-project", createProject)

router.get("/admin/all-users", findAllUsers)

router.get("/admin/all-projects", findAllProjects)

router.get("/admin", adminPage) 

router.get("/admin/modify-users", adminPageUser)

router.get("/admin/modify-projects", adminPageProject)




module.exports = router