const mongoose = require('mongoose')
let userSchema= new mongoose.Schema({
    fullName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,default:false},
    activationStatus:{type:Boolean,default:true}

})
const User = mongoose.model('users', userSchema);
module.exports= User