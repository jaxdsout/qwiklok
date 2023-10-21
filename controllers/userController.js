const User = require('../models/user');

const adminPage = (req, res) => {
    res.render("admin")
}

const contractorPage = (req, res) => {
    res.render("contractor")
}

const indexPage = (req, res) => {
    res.render("index")
}

// ////////// ADMIN FUNCTIONS ////////// //
// ------- DISPLAY ALL USERS ------------ //
const getAllUsers = async (req,res) => {
    console.log(req.body);
    const allMyUsers = await User.find();
    console.log(allMyUsers);
    res.render("/", { allMyUsers });
};





module.exports = {
    adminPage,
    contractorPage,
    indexPage, 
    getAllUsers
}

