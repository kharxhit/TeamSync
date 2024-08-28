const express = require('express')
const router = express.Router()
const {
    getTask,
    getTasks,
    createTask,
    deleteTask,
    updateTask
} = require('../controllers/taskController')
// const requireAuth = require('../middleware/requireAuth')

// require auth for all task routes
// router.use(requireAuth)

//Get all tasks
router.get('/',getTasks)
 
//GET a single task 
router.get('/:id',getTask)

//POST a new task
router.post('/', createTask)

//DELETE a task
router.delete('/:id',deleteTask)

//Update a task
router.patch('/:id',updateTask)

module.exports = router
