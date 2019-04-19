const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:String,
    c:{type:Number,default:0}, 
    cpp:{type:Number,default:0},
    java:{type:Number,default:0},
    common:{type:Number,default:0},

   
})

mongoose.model('users',userSchema)
