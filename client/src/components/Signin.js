import React,{useState,useContext}from 'react';
import {Link,useHistory} from 'react-router-dom';
import {UserContext} from '../App'

import M from 'materialize-css'
const Signin=()=>{
   const history=useHistory()
    const [error,setError]=useState("")
   const [password,setPassword]=useState("")
const [email,setEmail]=useState("")
const {state,dispatch}=useContext(UserContext)

const PostData=(e)=>{
    e.preventDefault()
    fetch("/signin",{
    method:"post",
    headers:{
    "Content-Type":"application/json"
    },
    body:JSON.stringify({
        email,password
    })
   }).then(res=>{return res.json()})
   .then(data=>{
    console.log(data)
       if(data.error){
        setError(data.error)
       }
       else{
           console.log(data);
        localStorage.setItem("token",data.token)   
        localStorage.setItem("user",JSON.stringify(data.user))   
        dispatch({type:"USER",payload:data.user})
       
           history.push('/')
        }
   }).catch(err=>console.log(err))
}
return(
//     <div className="mycard">
//     <div className="card auth-card  input-field" >
//         <h2>Blogs</h2>
//         {
//         error? <div class="ui negative message">
//         <div class="header">We are sorry we can&#x27;t apply that discount</div>
//         <p>That offer has expired</p>
//       </div>:""
        
           
        
//         }
//         <input type="text" placeholder="email" value={email} onChange={e=>{setEmail(e.target.value)}}/>    
   
//         <input type="password" placeholder="password" value={password} onChange={e=>{setPassword(e.target.value)}}/>    
   
//   <button className="btn waves-effect waves-light #64b5f6 blue darken-1" type="submit" onClick={()=>PostData()}>
//       Login
  
//   </button>    
    
//   <h5>
//       <Link to="/signup">Don't have an account?</Link>
//   </h5>
//     </div>
//     </div>

<div style={{width:"500px",marginLeft:"430px"}}>
<div class="ui attached message">
  <div class="content">
    <div class="header">Welcome to our IMDB!</div>
    <p>Fill out the form below to sign-in to access your account</p>
  </div>
</div>
{
        error? <div class="ui negative message">
        <div class="header">{error}</div>
       
      </div>:""
}
<form class="ui form attached fluid segment">
    <div class="field">
      <label>Email</label>
      <div class="ui fluid input"><input type="text" placeholder="email" value={email} onChange={e=>{setEmail(e.target.value)}} /></div>
    </div>
    <div class="field">
    <label>Password</label>
    <div class="ui input"><input type="password" placeholder="password" value={password} onChange={e=>{setPassword(e.target.value)}} /></div>
  </div>
  {/* <div class="inline field">
    <div class="ui checkbox">
      <input type="checkbox" class="hidden" readonly="" tabindex="0" />
      <label>I agree to the terms and conditions</label>
    </div>
  </div> */}
  <button class="ui blue button" type="submit" onClick={(e)=>PostData(e)}>Submit</button>
</form>
<div class="ui warning bottom attached message">
  <i aria-hidden="true" class="help icon"></i>
   <Link to="/signup">Don't have an account?</Link>
</div>
</div>

)


}
export default Signin