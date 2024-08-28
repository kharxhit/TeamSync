const express = require('express')
const router = express.Router()
const {
    getInvite,
    getInvites,
    createInvite,
    deleteInvite
} = require('../controllers/userInviteController')
// const requireAuth = require('../middleware/requireAuth')

// require auth for all task routes
// router.use(requireAuth)

//Get all tasks
router.get('/',getInvites)
 
//GET a single task 
router.get('/:id',getInvite)

//POST a new task
router.post('/', createInvite)

//DELETE a task
router.delete('/:id',deleteInvite)


module.exports = router
