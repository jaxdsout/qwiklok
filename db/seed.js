const User = require('../models/user')
const Project = require('../models/project')
const Klok = require("../models/klok")

const userData = require('./user.json')
const projectData = require('./project.json')

async function seedDatabase() {
    await Klok.deleteMany()
    await User.deleteMany();
    await Project.deleteMany();
    await User.insertMany(userData);
    await Project.insertMany(projectData);
    console.log('Database seeding completed successfully.');
}

seedDatabase();

