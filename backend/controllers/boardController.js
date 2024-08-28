const Board = require('../models/board')
const mongoose = require('mongoose')
const UserSchema = require('../models/user')

// Get all boards 
const getBoards = async (req,res) =>{

    const board = await Board.find()
    res.status(200).json(board)
}

// Get a single Board
const getBoard = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error : 'No such Board'})
    }
    const board = await Board.findOne({_id:id})
    if(!board){
        return res.status(404).json({error : 'No Such Board'})
    }
    res.status(200).json(board)
}

// Create new Board
const createBoard = async (req,res) => {
    try {
        const id = req.body.createdBy
        console.log(req.body)
        const user = await UserSchema.findOne({_id:id})
        const creatorName = user.name
        const body = {
            "name":`${req.body.name}`,
            "description":`${req.body.description}`,
            "createdById":`${id}`,
            "createdByName":`${creatorName}`,
            "projectId":`${req.body.projectId}`
        }
        const org = await Board.create(body);
        res.status(200).json(org);
    }
    catch (error) {
        res.status(201).json({ error: error.message });
    }
}

// delete a Board 
const deleteBoard = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error : 'No such Board'})
    }
    const board = await Board.findOneAndDelete({_id:id})
    if(!board){
        return res.status(404).json({error : 'No Such Board'})
    }
    res.status(200).json({mssg:"Board deleted successfully"})
}

// update a Board
const updateBoard = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error : 'No such Board'})
    }
    const board = await Board.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!board){
        return res.status(404).json({error : 'No Such Board'})
    }
    res.status(200).json(Board)
}


module.exports = {
    getBoard,
    getBoards,
    createBoard,
    deleteBoard,
    updateBoard
}