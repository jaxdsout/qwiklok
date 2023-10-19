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

module.exports = {
    adminPage,
    adminPageUser,
    adminPageProject,
    adminPageKlok,
    createUser,
    createProject,
    createKlok,
    findAllUsers,
    findAllProjects,
    updateUser,
    updateProject
}

