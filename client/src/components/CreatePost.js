import React,{useState} from 'react';
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'
const Createpost=()=>{
  const history=useHistory()
  const [title,setTitle]=useState("")
   const [body,setBody]=useState("")
const postDetails=()=>{
  fetch("/createpost",{
    method:"post",
    headers:{
    "Content-Type":"application/json",
    "Authorization":"Bearer "+localStorage.getItem("token")
    
    },
    body:JSON.stringify({
        title,body
    })
   }).then(res=>{return res.json()})
   .then(data=>{
    
       if(data.error){
        M.toast({html: data.error,classes:"#c62828 red darken-3"})
       }
       else{
           M.toast({html:"Created post successfully",classes:"#43a047 darken-1"})
        history.push('/allposts')
        }
   }).catch(err=>console.log(err))
  
  

}
  return(
    <div className="card input-field"
    style={{
        margin:"30px auto",
        maxWidth:"500px",
        padding:"20px",
        textAlign:"center"
    }}>

        <input type="text" value={title} onChange={e=>setTitle(e.target.value)} placeholder="title"></input>
        <input type="text" value={body} onChange=       {e=>setBody(e.target.value)} placeholder="body"></input>
        
    <button className="btn waves-effect waves-light #64b5f6 blue darken-1" type="submit"
    onClick={()=>postDetails()} >
      Submit Post
  
  </button>    
  
    </div>

)
}
export default Createpost