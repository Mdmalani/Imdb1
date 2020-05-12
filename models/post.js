const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types

const MovieSchema=new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    runtime:{
        type:String,
        required:true
    },
    
    plot:{
        type:String,
        required:true
    },
    poster:{
        type:String,
        required:true    
  },
   comments:[
       {
           text:String,
           postedBy:{
               type:ObjectId,
               ref:"user"
           },
           
       },
       
   ],
   
   rating:{
    type:String,
    
},
   
})

mongoose.model("Movie",MovieSchema)
