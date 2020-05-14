import React, { useContext, useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import Showmovie from './Showmovie';

import {UserContext} from '../App'
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
      titleerror:"",
      yearerror:""
    })
    const {state,dispatch}=useContext(UserContext)

    const validate=()=>{
     
      if(!year ||year<1000 ||year>9999 || !title )
      {
        console.log("here")
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
        if(!title)
        setError({...error,titleerror:"titleerror"})
        
      }}
        
        /></div>
   {!error.titleerror && 
  <span style={{textcolor:"red"}} >Please enter the title</span>}
    </div>
    <div class="field">
      <label>Year</label>
      <div class="ui fluid input"><input type="number"  min="1000" max="9999" placeholder="Year" value={year} 
      onChange={(e)=>

      {
        setYear(e.target.value)
        if(!year || year<1000 ||year>9999 )
        setError({...error,yearerror:"Please enter the year in range 1001 and 9999"})
        else
        setError({...error,yearerror:""})
      }
      
      } /></div>
      {error.yearerror && 
  <span className='error'>{error.yearerror}</span>}
   
    </div>
    <div class="field">
      <label>Runtime</label>
      <div class="ui fluid input"><input type="text" placeholder="Runtime" value={runtime}onChange={(e)=>setRuntime(e.target.value)}/></div>
    </div>
    <div class="field">
      <label>Rating</label>
      <div class="ui fluid input"><input type="number" placeholder="rating" value={rating}onChange={(e)=>setRating(e.target.value)}/></div>
    </div>
    
    </div>
  <div class="field">
    <label>Plot</label>
    <textarea placeholder="Tell us more about plot..." rows="3"  value={plot}onChange={(e)=>setPlot(e.target.value)} ></textarea>
  </div>
  <div class="field">
    <label>Poster</label>
    <input type="file" onChange={event=>setImage(event.target.files[0])}/> 
  </div>
  <div class="field">
    <label>Comment</label>
    <textarea placeholder="Tell us your review..." rows="3"  value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
  </div>
  
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