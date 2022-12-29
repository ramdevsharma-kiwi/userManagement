const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required : true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    
    name:{
        type: String,
        required: true,
    },
    phoneNo:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
     
    },

    password:{
        type: String,
        required: true
    },
    
    profilePicture: {
        type: String,
     }


},{
    timestamps: true
});


const User = mongoose.model('User',userSchema);
module.exports = User;
