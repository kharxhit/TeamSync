const Project = require('../models/project')
const mongoose = require('mongoose')
const Orrg = require('../models/organisation')
const UserSchema = require('../models/user');

// Get all projects 
const getProjects = async (req,res) =>{

    const project = await Project.find()
    res.status(200).json(project)
}

// Get a single project
const getProject = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error : 'No such project'})
    }
    const project = await Project.findById(id)
    if(!project){
        return res.status(404).json({error : 'No Such Project'})
    }
    res.status(200).json(project)
}

// Create new project
const createProject = async (req,res) => {
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
            "orgId":`${req.body.orgId}`
        }
        const org = await Project.create(body);
        res.status(200).json(org);
    }
    catch (error) {
        res.status(201).json({ error: error.message });
    }
}

// delete a project 
const deleteProject = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error : 'No such project'})
    }
    const project = await Project.findOneAndDelete({_id:id})
    if(!project){
        return res.status(404).json({error : 'No Such Project'})
    }
    res.status(200).json({mssg:"Project deleted successfully"})
}

// update a project
const updateProject = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error : 'No such project'})
    }
    const project = await Project.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!project){
        return res.status(404).json({error : 'No Such Project'})
    }
    res.status(200).json(project)
}


module.exports = {
    getProject,
    getProjects,
    createProject,
    deleteProject,
    updateProject
}