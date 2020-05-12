const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types
const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    wishlist:[
        {
        type:ObjectId,
        ref:"Movie"
        
    }
    ]
})
mongoose.model("user",userSchema)