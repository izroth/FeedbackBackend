const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
    },
    password:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    },
    jwt:{
        type: String,
    }

})

module.exports = mongoose.model('User', userSchema)