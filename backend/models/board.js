const mongoose = require('mongoose');
const schema = mongoose.Schema;

const board = new schema({
    name: {
        required: true,
        type: String
    },

    description:{
        required :true,
        type:String
    },

    createdAt: {
        required: true,
        type: Date,
        default:Date.now()
    },

    updatedAt: {
        type: Date,
        default:Date.now()
    },

    createdById:{
        required:true,
        type:mongoose.Schema.Types.ObjectId, ref: `user`
    },
    createdByName:{
        required:true,
        type:String
    },
    managerList:[
        {
            required: true,
            type: mongoose.Schema.Types.ObjectId, ref: `User`

        }
    ],

    tasks:[
        {
            required: true,
            type: mongoose.Schema.Types.ObjectId, ref: `task`,
        }
    ],

    projectId:{
        required: true,
        type: mongoose.Schema.Types.ObjectId, ref: `project`,
    }
   

})

module.exports = mongoose.model('board', board);