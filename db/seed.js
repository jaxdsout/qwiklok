const { User, Project, Admin } = require('../models/admin')
const Klok = require("../models/klok")

// const userData = require('./user.json')
// const projectData = require('./project.json')

function seedDatabase() {
    Admin.deleteMany();
    User.deleteMany();
    Project.deleteMany();
    Klok.deleteMany()
    console.log('Database seeding completed successfully.');
}

seedDatabase();

