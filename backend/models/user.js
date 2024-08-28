const mongoose = require('mongoose');
const schema = mongoose.Schema;
const date = new Date()
const bcrypt = require('bcrypt')
const validator = require('validator')


const user = new schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    createdAt: {
        required: true,
        type: String,
        default: date.toLocaleString()
    },
    image: {
        required: true,
        type: String
    },
    verified: {
        required: true,
        type: Boolean,
        default: false
    },
    updatedAt: {
        required: true,
        type: String,
        default: date.toLocaleString()
    },
    orgs: [
        {
            name: { required: true, type: String },
            createdBy: { required: true, type: mongoose.Schema.Types.ObjectId, ref: `user` },
            image: { required: true, type: String },
            createdAt: { required: true, type: String },
            _id: { required: true, type: mongoose.Schema.Types.ObjectId, ref: `organisation` }
        }
    ],
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: `task`,
        }
    ],
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: `project`,
        }
    ],
    
    boards: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: `board`,
        }
    ],
    sentInvites: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: `userInvite`,
        }
    ],
    invites: [
        {
            OrgName: { required: true, type: String },
            OrgId : {required: true, type: mongoose.Schema.Types.ObjectId, ref: `organisation`},
            InvitedByName: { required: true, type: String },
            InviteId: { required: true, type: mongoose.Schema.Types.ObjectId, ref: `userInvite` }
        }
    ],
    openOrg: {
        openOrgId: { type: mongoose.Schema.Types.ObjectId, ref: `organisation`, default: null },
        openOrgName: { type: String, default: null }
    },
    openProject: {
        openProjectId: { type: mongoose.Schema.Types.ObjectId, ref: `project`, default: null },
        openProjectName: { type: String, default: null }
    },
    openBoard: {
        openBoardId: { type: mongoose.Schema.Types.ObjectId, ref: `board`, default: null },
        openBoardName: { type: String, default: null }
    }
})

// static signup method
user.statics.signup = async function (prop) {
    // console.log(prop)

    //validation
    if (!prop.email || !prop.password) {
        throw Error('All feilds must be filled')
    }
    if (!validator.isEmail(prop.email)) {
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(prop.password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email: prop.email })
    if (exists) {
        throw Error('Email already exists')
    }
    const salt = await bcrypt.genSalt(10)
    prop.password = await bcrypt.hash(prop.password, salt)

    const user = await this.create(prop)
    return user
}

//static login method
user.statics.login = async function (prop) {
    // validation
    if (!prop.email || !prop.password) {
        throw Error('All feilds must be filled')
    }
    const user = await this.findOne({ email: prop.email })

    if (!user) {
        throw Error('Incorrect email')
    }
    const match = await bcrypt.compare(prop.password, user.password)

    if (!match) {
        throw Error('Incorrect Password')
    }

    return user
}

module.exports = mongoose.model('user', user);