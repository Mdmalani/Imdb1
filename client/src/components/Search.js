import React, { useContext, useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import Showmovie from './Showmovie';

import {UserContext} from '../App'
import { Flag } from 'semantic-ui-react';
const Search=()=>{
    const history=useHistory()
    const [url,setUrl]=useState("")  
    const [image,setImage]=useState("")
    const [title,setTitle]=useState("")  
    const [year,setYear]=useState("")  
    const [runtime,setRuntime]=useState("")  
    const [plot,setPlot]=useState("")  
    const [comment,setComment]=useState("")  
    const [rating,setRating]=useState("")  
    
    const [error,setError]=useState({
      titleerror:false,
      yearerror:false,
      runtimeerror:false,
      ratingerror:false,
      commenterror:"",
      ploterror:"",
      urlerror:""
    })
    const {state,dispatch}=useContext(UserContext)

    const validate=()=>{
     if(!title || title.length<0)
      { setError({...error,titleerror:"titleerror"})
       return false 
    }
    if(!year || year<1000 ||year>9999 )
    {
      setError({...error,yearerror:"Please enter the year in range 1001 and 9999"})
      return false
    }
    if(!runtime || runtime<1 )
    {
      setError({...error,runtimeerror:"Please enter the runtime in minutes"})
      return false

    }
    if(!rating || rating<0 || rating>10 )
      {  setError({...error,ratingerror:"Please enter the year in range 0 and 10"})
  return false
    }
    
    if(!plot || plot.length<10 )
      {  setError({...error,ploterror:"Please enter  some more words"})
  return false
    }
    if(!comment  )
      {  setError({...error,commenterror:"Please enter  comments"})
  return false
    }
     
    if(!url  )
    {  setError({...error,urlerror:"Please input the poster"})
return false
  }   
      return true

    }
    const postdetails=(e)=>{
      e.preventDefault()
      validate()
  const data=new FormData()
  data.append("file",image)
  data.append("upload_preset","Insta-clone")
  data.append("cloud_name","qwase")

  fetch("https://api.cloudinary.com/v1_1/qwase/image/upload",{
  method:"post",
  body:data

  }).then(res=>res.json())
  .then(data=>{
    console.log(data.url)
    setUrl(data.url)
  })
  .catch(err=>console.log(err))

    }
    useEffect(()=>{

      if(url){
        console.log(url)
       if(validate()){
        fetch('/newmovie',{
            method:"post",
            headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("token")
            
            },
            body:JSON.stringify({
                title:title.toUpperCase(),year,runtime,plot,url
            })
           }).then(res=>{return res.json()})
           .then(data=>{
            
               if(data.error){
               console.log(data.error)
               }
               else{
                history.push('/')
                }
           }).catch(err=>console.log(err))
        
      }}
    },[url])
       
   

             
                return(
               <>
               <div class="ui message">
                <div class="header">Sorry for the inconvenience. This movie is not available</div>
                    <p>
                    Please  continue to submit your rating
                </p>
                </div>
                <form   class="ui form"  style={{
        marginLeft:"100px",
        marginRight:"100px",
        border:"2px solid",
        padding:"20px"
    }}>
      
    <div class="equal width fields">
    <div class="field">
      <label>Title</label>
      <div class="ui fluid input"><input type="text" placeholder="Title" name="title" required value={title} 
      onChange={(e)=>{
        setTitle(e.target.value)
     setError({...error,titleerror:""})
            
      }}
        
        /></div>
   {error.titleerror && 
  <span style={{color:"red"}} >Please enter the title</span>}
    </div>
    <div class="field">
      <label>Year</label>
      <div class="ui fluid input"><input type="number"  min="1000" max="9999" placeholder="Year" value={year} 
      onChange={(e)=>

      {
        setYear(e.target.value)
        setError({...error,yearerror:""})
      }
      
      } /></div>
      {error.yearerror && 
  <span style={{color:"red"}}>{error.yearerror}</span>}
   
    </div>
    <div class="field">
      <label>Runtime</label>
      <div class="ui fluid input"><input type="number" placeholder="Runtime" value={runtime}onChange={(e)=>
        {
          
    
        setRuntime(e.target.value)
        setError({...error,runtimeerror:""})
      
        }
        }/></div>
   {error.runtimeerror && 
  <span style={{color:"red"}}>{error.runtimeerror}</span>}
   
    </div>
    <div class="field">
      <label>Rating</label>
      <div class="ui fluid input"><input type="text" placeholder="rating"  value={rating}onChange={(e)=>
        
      {
        setRating(e.target.value)
        setError({...error,ratingerror:""})
      }
        }/></div>
    {error.ratingerror && 
  <span style={{color:"red"}}>{error.ratingerror}</span>}
   
    </div>
    
    </div>
  <div class="field">
    <label>Plot</label>
    <textarea placeholder="Tell us more about plot..." rows="3"  value={plot}onChange={(e)=>
      {
        setPlot(e.target.value)
        setError({...error,ploterror:""})
      
        }} ></textarea>
     {error.ploterror && 
  <span style={{color:"red"}}>{error.ploterror}</span>}
 
  </div>
  <div class="field">
    <label>Poster</label>
    <input type="file" onChange={event=>
      {
        setImage(event.target.files[0])
        
          setError({...error,urlerror:""})
        
          
      }
        }/> 
        {error.urlerror && 
  <span style={{color:"red"}}>{error.urlerror}</span>}
 
        </div>
  <div class="field">
    <label>Comment</label>
    <textarea placeholder="Tell us your review..." rows="3"  value={comment} onChange={(e)=>
      {
        setComment(e.target.value)
        setError({...error,commenterror:""})
      }}></textarea>
  </div>
  
  {error.commenterror && 
  <span style={{color:"red"}}>{error.commenterror}</span>}
 
  
  <div class="field"><button onClick={(e)=>postdetails(e)}class="ui button">Submit</button></div>
</form>

                {/* <form className="ui form" 
                style={{
                    padding:"29px" ,margin: "auto",
                    marginLeft:"40px"
                    }}>
  <div className="field">
    <label>Title</label>
    <input placeholder="Title" />
  </div>
  <div className="field">
    <label>Year</label>
    <input placeholder="Year" />
  </div>
  <button type="submit" className="ui button">Submit</button>
</form> */}

</>
                )
            
         }
          
      



export default Search