const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userInvite = new schema({
    email: {
        required: true,
        type: String
    },
    invitee:{
        required: true,
        type: mongoose.Schema.Types.ObjectId, ref: `user`,
    },
    createdAt: {
        required: true,
        type: Date,
        default:Date.now()
    },    
    org:{
            required: true,
            type: mongoose.Schema.Types.ObjectId, ref: `organisation`,
        },

    invitedBy:{
            required:true,
            type:mongoose.Schema.Types.ObjectId, ref: `user`,
        }

})

module.exports = mongoose.model('userInvite', userInvite);