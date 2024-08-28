const express = require('express')
const router = express.Router()
const {
    getBoard,
    getBoards,
    createBoard,
    deleteBoard,
    updateBoard
} = require('../controllers/boardController')
// const requireAuth = require('../middleware/requireAuth')

// require auth for all task routes
// router.use(requireAuth)

//Get all tasks
router.get('/',getBoards)
 
//GET a single task 
router.get('/:id',getBoard)

//POST a new task
router.post('/', createBoard)

//DELETE a task
router.delete('/:id',deleteBoard)

//Update a task
router.patch('/:id',updateBoard)

module.exports = router
