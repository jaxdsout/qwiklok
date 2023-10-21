// ROOT IS "/user"

const express = require('express');
const router = express.Router();

const { homePage, 
        loginUser,      
        createKlok,
        userProfile,
    } = require("../controllers/userController")

router.get("/", homePage)

router.post("/login", loginUser)

router.get("/user/:id", userProfile)

router.post("/user/klok", createKlok)


module.exports = router