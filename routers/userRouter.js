// ROOT IS "/user"

const express = require('express');
const router = express.Router();

const { homePage, 
        loginUser,      
        createKlok,
        userProfile,
        updateProfile,
        projectProfile,
        updat
    } = require("../controllers/userController")

router.get("/", homePage)

router.post("/login", loginUser)

router.post("/klok", createKlok)

router.get("/user/:id", userProfile)

// router.put("/user/:id/edit", updateUser)

// router.get("/project/:id", projectProfile)

// router.put("/project/:id/edit", updateProfile)


module.exports = router