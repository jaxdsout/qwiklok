const User = require("../models/user");

const homePage = (req, res) => {
    res.render("home")
}

const loginUser = async (req, res) => {
    const userPIN = await User.find({
        PIN: req.body.PIN,
    })
    console.log(userPIN)
    res.render("user", { userPIN })
}

module.exports = {
    homePage,
    loginUser
}

