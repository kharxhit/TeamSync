const express = require('express')
const router = express.Router()
const {
    organisationGet,
    organisationGetId,
    organisationPost,
    organisationDelete,
    organisationPut
} = require('../controllers/organisationcontroller')
// const requireAuth = require('../middleware/requireAuth')

// require auth for all project routes
// router.use(requireAuth)

//Get all projects
router.get('/',organisationGet)
 
//GET a single project 
router.get('/:id',organisationGetId)

//POST a new project
router.post('/', organisationPost)

//DELETE a project
router.delete('/:id',organisationDelete)
//Update a project
router.patch('/:id',organisationPut)

module.exports = router