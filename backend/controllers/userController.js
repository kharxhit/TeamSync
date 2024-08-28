const User = require('../models/user')
const {createToken} = require('../middleware/createToken')
const mongoose = require('mongoose');
const { findById } = require('../models/organisation');

//login user
const loginUser = async (req,res) =>{
    try{
        const user = await User.login(req.body)
        console.log(user)
 
        //create a token
        const token = createToken (user._id)
        // res.header('token', `${token}`)
        user.token = token
        res.status(200).json(user)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//signup user
const signupUser = async (req,res) =>{
    console.log(req.body)
    try{
        const user = await User.signup(req.body)

        //create a token
        const token = createToken (user._id)
        res.header('token', `${token}`)
        // user.token = token

        res.status(200).json(user)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const getAllUsers = async (req, res) => {

    const users = await User.find();
    res.status(200).json(users);

}

const userupdate=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No such user'})
    }
   
       const user=await User.findOneAndUpdate({"_id":id},{...req.body});
   
  if(!user){
    res.status(201).json({error:"NO SUCH USER"});
  }
  res.json(user)
}

const deleteOrg = async (req,res) => {
    console.log("hello")
    const {id} = req.params
    const user = await User.findOne({_id:id})
    res.status(200).json(user)
    console.log(req.body)
    user.orgs.splice(req.body.orgId,1)
    user.save()
}

const finduser=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No such user'})
    }
    const user=await User.findOne({_id:id});
    console.log(user)

    if(!user){
        res.status(201).json({error:"NO SUCH USER"});
      }
     res.json(user)
}
module.exports = {loginUser,signupUser,userupdate,finduser,getAllUsers,deleteOrg}