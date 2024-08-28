// const { default: Boards } = require('../../frontend/src/Pages/ProjectPage/Boards')
const Boards = require('../models/board')
const Task = require('../models/task')
const mongoose = require('mongoose')

// Get all tasks 
const getTasks = async (req,res) =>{
    const task = await Task.find()
    res.status(200).json(task)
}

// Get a single Task
const getTask = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error : 'No such Task'})
    }
    const board =await Boards.findOne({_id:id})
    // const task = await Task.findById(id)
    let p = board.tasks
    let task = []
    for(let i=0;i<p.length;i++) {
        const f = await Task.findOne({_id:p[i]})
        task.push(f)
        // console.log(f)
    }
    if(!task){
        return res.status(404).json({error : 'No Such Task'})
    }
    res.status(200).json(task)
}

// Create new Task
const createTask = async (req,res) => {
    if(req.body.length > 0){
        return res.status(400).json({error: ' Please Fill in all the Fields',emptyFields})
    }
    // add doc to db
    try{
        const task = await Task.create(req.body)
        const id = task.boardId
        const board = await Boards.findById(id)
        board.tasks.push(task._id)
        board.save()
        res.status(200).json(task)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

// delete a Task 
const deleteTask = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error : 'No such Task'})
    }
    const task = await Task.findOneAndDelete({_id:id})
    if(!task){
        return res.status(404).json({error : 'No Such Task'})
    }
    res.status(200).json({mssg:"Task deleted successfully"})
}

// update a Task
const updateTask = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error : 'No such Task'})
    }
    const task = await Task.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!task){
        return res.status(404).json({error : 'No Such Task'})
    }
    res.status(200).json(task)
}


module.exports = {
    getTask,
    getTasks,
    createTask,
    deleteTask,
    updateTask
}