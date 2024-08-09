const mongoose = require('mongoose');
require("../config/db")

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project'
    }],
    timeStamp: {
        type: Date
    }

})

const UserModel = mongoose.model('UserModel',userSchema)
module.exports = UserModel

