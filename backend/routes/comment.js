const express = require('express')
const router = express.Router()
const {
    getComments,
    createComment,
    deleteComment
} = require('../controllers/commentController')
// const requireAuth = require('../middleware/requireAuth')

// require auth for all task routes
// router.use(requireAuth)

//Get all tasks
router.get('/',getComments)

//POST a new task
router.post('/', createComment)

//DELETE a task
router.delete('/:id',deleteComment)


module.exports = router
