const mongoose = require('mongoose');
const schema = mongoose.Schema;

const task = new schema({
    title: {
        required: true,
        type: String
    },
    
    description:{
        type: String
    },

    createdAt: {
        required: true,
        type: Date,
        default:Date.now()
    },

    updatedAt: {
        required: true,
        type: Date,
        default:Date.now()
    },

    assignees:[
        {
            // required:true,
            type:mongoose.Schema.Types.ObjectId, ref: `user`,
        }
    ],

    boardId:{
        // required:true,
        type:mongoose.Schema.Types.ObjectId, ref: `board`,
    },

    assignedBy:{
        // required:true,
        type:mongoose.Schema.Types.ObjectId, ref: `user`,
    },

    priority:{
        // required : true,
        type: String,
        // enum:["lowest","Low","Medium","High","highest"]
    },

    category:{
        required : true,
        type: String,
        enum:["toDo","done","inProgress","brainStorm","deployed","backLog","onHold"]
    },

    comments:[
        {
            type:mongoose.Schema.Types.ObjectId, ref: `comment`,
        }
    ]

})

module.exports = mongoose.model('task', task);