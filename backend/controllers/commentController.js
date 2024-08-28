const Comment = require('../models/comment')
const mongoose = require('mongoose')

// Get all comments 
const getComments = async (req,res) =>{

    const comment = await Comment.find()
    res.status(200).json(comment)
}

// Create new Comment
const createComment = async (req,res) => {
    if(req.body.length > 0){
        return res.status(400).json({error: ' Please Fill in all the Fields',emptyFields})
    }
    // add doc to db
    try{
        const comment = await Comment.create(req.body)
        res.status(200).json(comment)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

// delete a Comment 
const deleteComment = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error : 'No such Comment'})
    }
    const comment = await Comment.findOneAndDelete({_id:id})
    if(!comment){
        return res.status(404).json({error : 'No Such Comment'})
    }
    res.status(200).json({mssg:"Comment deleted successfully"})
}


module.exports = {
    getComments,
    createComment,
    deleteComment
}