const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({

    //Username denotes to Unique email of users
    username: {
        type: String,
        required: [true, 'Please Enter the Email'],
        unique: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true, 'Please Enter password'],
        minlength: [6, 'Please Enter Strong password']
    }
});


module.exports = mongoose.model('user', userSchema);