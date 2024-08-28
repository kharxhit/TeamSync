const express = require('express')
const router = express.Router()
const {
    getProject,
    getProjects,
    createProject,
    deleteProject,
    updateProject
} = require('../controllers/projectController')
// const requireAuth = require('../middleware/requireAuth')

// require auth for all project routes
// router.use(requireAuth)

//Get all projects
router.get('/',getProjects)
 
//GET a single project 
router.get('/:id',getProject)

//POST a new project
router.post('/', createProject)

//DELETE a project
router.delete('/:id',deleteProject)

//Update a project
router.patch('/:id',updateProject)

module.exports = router