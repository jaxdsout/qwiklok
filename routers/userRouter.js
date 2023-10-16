// ROOT IS "http://timepunch.com"

const express = require(express);
const router = express.Router();

router.get("/", index)

router.get("/user/admin", adminHome)

router.post("/new-user", createNewUser)

router.get("/user/:id", userHome)

router.put("user/:id/edit", editUser)

router.delete("user/:id/delete", deleteUser)

module.exports = router