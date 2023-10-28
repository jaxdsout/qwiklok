const express = require('express');
const router = express.Router();

const { userAuth } = require("../middleware/authenticator")

const {
    sendPINForm,
    userLogin,
    userLogout,
    userHome,
    createKlok
} = require("../controllers/userController");


// --------------- USER LOGIN

router.get("/user/login", sendPINForm)

router.post("/user/login", userLogin)

router.get("/user/logout", userLogout);

router.get("/user/home/:id", userHome)


// router.use(userAuth)

// USER KLOK

router.post("/user/home/:id/klok", createKlok)

module.exports = router

