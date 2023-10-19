const project = require('../models/project');

const getAllProjects = async (req, res) => {
    const allMyProjects
 = await Project.find();
    console.log(allMyProjects);
    res.redirect("/projects")
}

const createProject = async (req, res) => {
    console.log(req.body);
    const newProject = await User.create(req.body)
    console.log(newProject)
    res.redirect("/project")
}


module.exports = {
    createProject,
    getAllProjects
}

