const User = require('../models/user');
const Project = require('../models/project')


// const userPage = (req, res) => {
//     res.render("user")
// }

const adminPage = (req, res) => {
    res.render("admin")
}

const adminPageUser = async (req, res) => {
    const users = await User.find();
    res.render("modifyu", { users })
}

const adminPageProject = async (req, res) => {
    const projects = await Project.find();
    res.render("modifyp", { projects })
}


const createUser = async (req, res) => {
    const newUser = await User.create(req.body)
    console.log(newUser);
    res.redirect("/user/admin/modify-users")
}

const findAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json({
        "data": users,
        "status": 200
        })
    }
    catch (error) {
      next(error);
    }
}

const createProject = async (req, res) => {
    const newProj = await Project.create(req.body)
    console.log(newProj);
    res.redirect("/user/admin/modify-projects")
}

const findAllProjects = async (req, res) => {
    try {
        const projects = await Project.find()
        res.json({
        "data": projects,
        "status": 200
        })
    }
    catch (error) {
      next(error);
    }
}

module.exports = {
    adminPage,
    // userPage,
    createUser,
    findAllUsers,
    createProject,
    findAllProjects,
    adminPageUser,
    adminPageProject,
    // userLogin
}

