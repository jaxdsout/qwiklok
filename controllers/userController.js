const User = require('../models/user');

const getAllUsers = async (req, res) => {
    const allMyUsers = await User.find();
    console.log(allMyUsers);
    res.redirect("/user")
}

const createUser = async (req, res) => {
    console.log(req.body);
    const newUser = await User.create(req.body)
    console.log(newUser)
    res.redirect("/user")
}


module.exports = {
    createUser,
    getAllUsers
}

