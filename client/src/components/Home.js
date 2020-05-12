import React, { useEffect, useState, useContext } from 'react';
import {Carousel} from 'react-bootstrap'
import {UserContext} from '../App'
import {useHistory} from 'react-router-dom'

const Home =()=>{
  const history=useHistory()
 const [data,setData]=useState([])
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    fetch('/allposts',{
      method:"get",
      headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem("token")
      
      },
      
     }).then(res=>{return res.json()})
     .then(data=>{
      console.log(state)

         if(data.error){
         console.log(data.error)
         }
         else
         setData(data.allposts)
       
     }).catch(err=>console.log(err))
  

  },[])
 
 const add=(id)=>{
console.log(state)
const user=localStorage.getItem("user")
if(!user)
history.push('/signin')
else{
  fetch('/add',{
    method:"post",
    headers:{
    "Content-Type":"application/json",
    "Authorization":"Bearer "+localStorage.getItem("token")
    
    },
    body:JSON.stringify({
      id:id
    })
   }).then(res=>{return res.json()})
   .then(data=>{
    console.log(data)
       if(data.error){
       console.log(data.error)
       }
       else{
         console.log(state)
        dispatch({type:"UPDATE",
        payload:data.wishlist})
        localStorage.setItem("user",JSON.stringify(data))
    
        console.log(state)
        
       }
   }).catch(err=>console.log(err))
  }
 }


 const remove=(id)=>{
  console.log(state)
  const user=localStorage.getItem("user")
  if(!user)
  history.push('/signin')
  else{
    fetch('/remove',{
      method:"post",
      headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem("token")
      
      },
      body:JSON.stringify({
        id:id
      })
     }).then(res=>{return res.json()})
     .then(data=>{
      console.log(data)
         if(data.error){
         console.log(data.error)
         }
         else{
           console.log(state)
          dispatch({type:"UPDATE",
          payload:data.wishlist})
          localStorage.setItem("user",JSON.stringify(data))
      
          console.log(state)
          //localstorage
         }
     }).catch(err=>console.log(err))
    }
   }
 
  if(data){     
  return ( 
           <div style={{marginLeft:"30px",marginright:"10px",padding:"2px"}}>
             <div class="ui four cards" style={{height:"10px"}}>

        
        {

data.map((item)=>{
  return(
    <div style={{display:"flex",justifyContent:"space-between",padding:"5px",height:"10px"}}>

  
  <div class="ui raised card">
    <div class="image"><img src={item.poster} /></div>
    <div class="content">
  <div class="header">{item.title}</div>
    <h4>8.5  <i aria-hidden="true" class="star icon"></i>
</h4>
  </div>
  <div class="extra content" style={{alignContent:"center",marginLeft:"55px"}}>
   {  state?(state.wishlist.includes(item._id)
   ?<button className="ui primary button" onClick={()=>
    remove(item._id)}><i style={{
      bottomTop:"1px"}} aria-hidden="true" class="red heart large inverted icon"></i>Wishlisted</button>:<button onClick={()=>{add(item._id)}} className="ui primary button" style={{
    marginLeft:"30px"}}>
    <i aria-hidden="true" class="red inverted heart outline"></i>
    Wishlist
  </button>):""
}   
  
    
  </div>
  </div>
  
</div>

      
    
  )
})}
</div>
</div>
         );
    }
  }
 
export default Home;