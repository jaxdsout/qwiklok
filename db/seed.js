const User = require('../models/user')
const userData = require('./user.json')

const Project = require('../models/project')
const projectData = require('./project.json')

async function seedDatabase() {
  try {
    await User.deleteMany();
    await Project.deleteMany();
    await User.insertMany(userData);
    await Project.insertMany(projectData);
    console.log('Database seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    process.exit();
  }
}

seedDatabase();

