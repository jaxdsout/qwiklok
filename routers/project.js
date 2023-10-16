// ROOT IS "http://timepunch.com/project"

const express = require(express);
const router = express.Router();

router.get('/', allProjects)

router.get('/new-project', newProject)

router.get('/:id', projectDetail)

router.put('/:id/edit', editProject)

router.delete('/:id/delete', deleteProject)

module.exports = router