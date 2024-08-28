const express = require('express')
const router = express.Router()

//controller function
const {loginUser,signupUser,userupdate,finduser,getAllUsers,deleteOrg} = require('../controllers/userController')

//login route
router.post('/login',loginUser)

//signup route
router.post('/signup',signupUser)
router.delete('/:id',deleteOrg)
router.get('/:id',finduser)
router.patch('/:id',userupdate)
router.get('/',getAllUsers)

module.exports = router