// ROOT IS "http://timepunch.com/punch"

const express = require('express')
const router = express.Router()

router.get("/all", allPunches)

router.get("/userID", userPunches)

router.post("/userID", newPunch)

router.put("/userID/:id", editPunch)

router.delete("/userID/:id", deletePunch)

module.exports = router