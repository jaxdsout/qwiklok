const User = require('../models/user');
const Project = require('../models/project')
const Klok = require("../models/klok")


// PAGES

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

const adminPageKlok = async (req, res) => {
    const kloks = await Klok.find();
    res.render("modifyk", { kloks })
}

const editUserPage = async (req, res) => {
    const user = await User.findById(req.params._id);
    res.render("edituser", { user })
}

const editProjectPage = async (req, res) => {
    const project = await Project.findById(req.params.id);
    res.render("editproject", { project })
}



// CREATE

const createUser = async (req, res) => {
    const newUser = await User.create(req.body)
    console.log(newUser);
    res.redirect("/user/admin/modify-user")
}


const createKlok = async (req, res) => {
    const newKlok = await Klok.create({
        user: req.params._id,
        projectID: req.body.projectID,
        date: req.body.date,
        description: req.body.description,
        hours: req.body.hours
    })
    console.log(newKlok)
    res.redirect("/user/:id")
}


const createProject = async (req, res) => {
    const newProj = await Project.create(req.body)
    console.log(newProj);
    res.redirect("/user/admin/modify-project")
}


// READ

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

// UPDATE

const updateUser = async (req, res) => {
    const user = await User.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body},
        { new: true }
        )
        console.log(user);
        res.redirect("/admin/modify-user")
}

const updateProject = async (req, res) => {
    const user = await Project.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body},
        { new: true }
        )
        console.log(user);
        res.redirect("/admin/update-user/:id")
}

// DELETE

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params._id);
        if (deleteUser) {
            console.log("Deleted User:", deletedUser);
            res.redirect("/admin/modify-user");
        } else {
            console.log("User not found.");
            res.status(404).send("User not found.");
        }
    } catch (error) {
        console.error("Error deleting User:", error);
        res.status(500).send("Internal Server Error");
    }
}

const deleteProject = async (req, res) => {
    try {
        const deletedProj = await Project.findByIdAndDelete(req.params.id);
        if (deleteProject) {
            console.log("Deleted Project:", deletedProj);
            res.redirect("/admin/modify-project");
        } else {
            console.log("Project not found.");
            res.status(404).send("Project not found.");
        }
    } catch (error) {
        console.error("Error deleting Project:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    adminPage,
    adminPageUser,
    adminPageProject,
    adminPageKlok,
    editUserPage,
    editProjectPage,
    createUser,
    createProject,
    createKlok,
    findAllUsers,
    findAllProjects,
    updateUser,
    updateProject,
    deleteUser,
    deleteProject
}

