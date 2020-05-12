const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const Movie=mongoose.model("Movie")
const User=mongoose.model("user")
const requirelogin=require('../middleware/requirelogin')

router.get('/allposts',(req,res)=>{
//console.log(req.query.scount)
 //console.log(req.query.tcount)

Movie.find().populate("comments.postedBy","_id name")    
.then(allposts=>{
    res.json({allposts})
}).catch(err=>console.log(err))

})
router.get('/wishlist',requirelogin,(req,res)=>{
    User.findById(req.userinfo._id).populate("wishlist","title  poster")    
    .then(result=>{
        res.json(result)
    }).catch(err=>console.log(err))
    
    })
router.post('/add',requirelogin,(req,res)=>{
    console.log(req.userinfo)
    User.findByIdAndUpdate(req.userinfo._id,{
    $push:{wishlist:req.body.id},
    },{
        new:true
    }).exec((err,result)=>{
        if(err)
        return res.status(422).json({error:err})
        else
        res.json(result)
    })
    
    })
    
    
router.post('/remove',requirelogin,(req,res)=>{
    console.log(req.body)
    User.findByIdAndUpdate(req.userinfo._id,{
    $pull:{wishlist:req.body.id},
    },{
        new:true
    }).exec((err,result)=>{
        if(err)
        return res.status(422).json({error:err})
        else
        res.json(result)
    })
    
    })
    
router.post('/newmovie',requirelogin,(req,res)=>{
    
    console.log("here")
    console.log(req.body)
    // const{title,year,runtime,plot,poster,comment}=req.body
    // if(!title){
    //     return res.status(422).json({"error":"Please enter the title of the movie"})
    // }
    // if(!title){
    //     return res.status(422).json({"error":"Please enter the title of the movie"})
    // }


    const Movied=new Movie({
                            "title":req.body.title,
                            "year":req.body.year,
                            "runtime":req.body.runtime,
                            "plot":req.body.plot,
                            "poster":req.body.url,
                            "comment":[req.body.comment]
            
                        })
                       Movied.save().then(result=>{res.json({Movied})}).catch(err=>console.log(err))
                         
})


router.get('/search',requirelogin,(req,resp)=>{
    // console.log(req.query.id);
     console.log(req.query.moviename)
     
     Movie.findOne({"title":req.query.moviename}).populate("comments.postedBy","_id name")
     .populate("postedBy","_id name")
     
     .exec((err,result)=>{
         if(err)
         return resp.status(422).json({error:err})
         else
         {
            if(!result)
            return resp.json({err:"movei not found"})
            else
            resp.json(result)
         }
        })
     
     
     
    //  .then(result=>{
    //      if (!result)
    //      {
    //              return resp.status(422).json({err:"movei not found"}) 
    //      }    
         
    //      else
    //      {
    //                //resp.json(result)
                   
    //      } 
         
    //  }).catch(err=>console.log(err))
 })    
 

 router.put('/makecomment',requirelogin,(req,res)=>{
    //  console.log(req.body)
    const comment={
        text:req.body.text,
        postedBy:req.userinfo._id
    }  
  
    Movie.findByIdAndUpdate(req.body.id,{
      $push:{comments:comment},
      },{
          new:true
      }).populate("comments.postedBy","_id name")
      .populate("postedBy","_id name")
      
      .exec((err,result)=>{
          if(err)
          return res.status(422).json({error:err})
          else
          res.json(result)
      })
      
      })
      



// router.put('/makecomment',requirelogin,(req,res)=>{
//    console.log(req.body)
//   const comment={
//       text:req.body.text,
//       postedBy:req.userinfo._id
//   }  
//   Movie.findByIdAndUpdate(req.body.id,{
//     $push:{comments:comment},
//     },{
//         new:true
//     },(err,result)=>{
//         if(err)
//         return res.status(422).json({error:err})
//         else
//         res.json(result)
//     }
    
//     )
// })

// router.delete('/deletepost/:postId',requirelogin,(req,res)=>{
//     blogPost.findOne({_id:req.params.postId})
//     .populate("postedBy","_id")
//     .exec((err,post)=>{
//         if(err|| !post)
//         return res.status(422).json({error:err})
//         if(post.postedBy._id.toString() ===             req.userinfo._id.toString() )
//          post.remove()
//          .then(result=>res.json(result))
//             .catch((err=>console.log(err)))
//         })
// })
module.exports=router