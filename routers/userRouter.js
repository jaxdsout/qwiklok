// ROOT IS "http://timepunch.com"

const express = require('express');
const router = express.Router();

const { createUser, getAllUsers} = require("../controllers/userController")

router.get("/", getAllUsers)

// router.get("/admin", adminHome)

router.post("/new-user", createUser)

// router.get("/:id", userHome)

// router.put("/:id/edit", editUser)

// router.delete("/:id/delete", deleteUser)

module.exports = router