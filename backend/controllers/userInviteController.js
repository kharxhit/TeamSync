const UserInvite = require('../models/userInvite')
const mongoose = require('mongoose')

// Get all Invites 
const getInvites = async (req,res) =>{

    const userInvite = await UserInvite.find()
    res.status(200).json(userInvite)
}

// Get a single UserInvite
const getInvite = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error : 'No such UserInvite'})
    }
    const userInvite = await UserInvite.findById(id)
    if(!userInvite){
        return res.status(404).json({error : 'No Such UserInvite'})
    }
    res.status(200).json(userInvite)
}

// Create new UserInvite
const createInvite = async (req,res) => {
    if(req.body.length > 0){
        return res.status(400).json({error: ' Please Fill in all the Fields',emptyFields})
    }
    // add doc to db
    try{
        const userInvite = await UserInvite.create(req.body)
        res.status(200).json(userInvite)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

// delete a UserInvite 
const deleteInvite = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error : 'No such UserInvite'})
    }
    const userInvite = await UserInvite.findOneAndDelete({_id:id})
    if(!userInvite){
        return res.status(404).json({error : 'No Such UserInvite'})
    }
    res.status(200).json({mssg:"UserInvite deleted successfully"})
}


module.exports = {
    getInvite,
    getInvites,
    createInvite,
    deleteInvite
}