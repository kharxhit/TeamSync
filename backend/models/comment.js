const mongoose = require('mongoose');
const schema = mongoose.Schema;

const comment = new schema({
    postedBy: {
        required: true,
        type:mongoose.Schema.Types.ObjectId, ref: `user`,
    },
    
    content:{
        required:true,
        type: String
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

    taskId:{
        required:true,
        type:mongoose.Schema.Types.ObjectId, ref: `task`,
    }



})

module.exports = mongoose.model('comment', comment);