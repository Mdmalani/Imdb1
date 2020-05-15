import React, { useEffect, useState, useContext } from 'react';
import {Carousel} from 'react-bootstrap'
import {UserContext} from '../App'
import {useHistory,Link} from 'react-router-dom'
import onshow from './Onshow'
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
      
     }).then(res=> res.json())
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
    <div style={{backgroundColor:"black",marginBottom:"5px"}}>
    <Carousel style={{marginLeft:"40px",marginRight:"60px"}}>
    <Carousel.Item >
      <img style={{height:"400px"}}
        className="d-block w-100"
        src="http://res.cloudinary.com/qwase/image/upload/v1589358706/xv4yebinimnjillvyhly.jpg" alt="First slide"
      />
      </Carousel.Item>
    <Carousel.Item >
      <img style={{height:"400px"}}
        className="d-block w-100"
        src="http://res.cloudinary.com/qwase/image/upload/v1589358706/xv4yebinimnjillvyhly.jpg"
        alt="Third slide"
      />
  
      
    </Carousel.Item>
  </Carousel>
  <br></br>
  <div style={{marginLeft:"50px"}}>
  <h3 style={{color:"yellow"}}>
  <strong >What to Watch</strong>
   </h3>
    <h4 style={{color:"gray"}}>Fans Favourites</h4>
    </div> 
         <br></br>
         <br></br>   
        {
          <div style={{display:"flex",
            justifyContent:"space-evenly"}}>
{
  data.map((item)=>{
     return(
        <span  style={{backgroundColor:"gray"}}>
        <img src={item.poster} style={{height:"200px"}}></img>
     <h3 style={{padding:"5px"}}>
      <Link  style={{color:"white"}}to={"/onshow/"+item.title}> {item.title}</Link>  
       </h3>
     <h4 style={{marginLeft:"10px"}}>8.5  <i aria-hidden="true" class="yellow star  inverted icon"></i>
                 </h4>
     <i aria-hidden="true" class="yellow star"></i>
     {  state?(state.wishlist.includes(item._id)
     ?<button  style={{
      marginLeft:"12px",
    backgroundColor: "dimgrey",
    border: "none",
    fontSize: "16px",
    textAlign: "center",
    color: "blue",
    padding:"5px 8px"
       
     }} onClick={()=>
      remove(item._id)}><i style={{
        bottomTop:"1px"}} aria-hidden="true" class="red heart large inverted icon"></i><span style={{color:"white"}}>Wishlisted</span></button>:<button  onClick={()=>{add(item._id)}}  
        style={{
          marginLeft:"25px",
        backgroundColor: "dimgrey",
        border: "none",
        fontSize: "16px",
        textAlign: "center",
        color: "white",
        padding:"5px 8px"
           
         }}>
      <i aria-hidden="true" class="red inverted heart outline"></i>
      Wishlist
    </button>):""
  }   
          </span>  

  
      
    
       )
})}
</div>
}
</div>


         );
    
    }
  }
 
export default Home;