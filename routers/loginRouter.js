const express = require('express');
const router = express.Router();

const { homePage, loginUser } = require("../controllers/loginController")

router.get("/", homePage)

router.post("/user", loginUser)


module.exports = router