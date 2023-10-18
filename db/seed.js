const User = require('../models/user')
const userData = require('./user.json')

const Project = require('../models/project')
const projectData = require('./project.json')

User.deleteMany({})
  .then(() => {
  return Project.deleteMany({})})
    .then(() => {
        return User.insertMany(userData)})
    .then(()=> {
          return Project.insertMany(projectData)})
    .then(console.log)
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        process.exit()
      })

