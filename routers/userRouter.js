// ROOT IS "/user"

const express = require('express');
const router = express.Router();

const { adminPage, contractorPage, indexPage } = require("../controllers/userController")

router.get("/admin", adminPage) 

router.get("/contractor", contractorPage)

router.get("/", indexPage)


module.exports = router