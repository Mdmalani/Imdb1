const {JWT_SECRET}=require('../keys')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
//require('./models/user')
const Userdata=mongoose.model("user")

module.exports =(req,res,next)=>{

    const {authorization}=req.headers
    if(!authorization)
    return res.status(401).json({error:"You must be logged in"})
    const token=authorization.replace("Bearer ","")
jwt.verify(token,JWT_SECRET,(error,payload)=>{
if(error)
return res.status(404).json({error:"You must be logged in"})
//console.log(payload)
const {_id}=payload
Userdata.findById(_id).then(Userdata=>{

    req.userinfo=Userdata
    next()
 
      //console.log(req.userinfo)
  })
  
})
}