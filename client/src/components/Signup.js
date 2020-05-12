import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css'
const Signup=()=>{
    const history=useHistory()
const [name,setName]=useState("")
const [error,setError]=useState("")
const [password,setPassword]=useState("")
const [email,setEmail]=useState("")
  const uploadFields=()=>{

    fetch("/signup",{
    method:"post",
    headers:{
    "Content-Type":"application/json"
    },
    body:JSON.stringify({
        name,email,password,
    })
   }).then(res=>{return res.json()})
   .then(data=>{

       if(data.error){
      setError(data.error)
      }
       else{
           history.push('/signin')
        }
   }).catch(err=>console.log(err))


  }
const PostData=(e)=>{
   e.preventDefault()
           uploadFields() 
    
    }
return(
    
  //   <div className="mycard">
  //   <div className="card auth-card  input-field" >
  //       <h2>Blogs</h2>
  //   <input type="text" placeholder="name" value={name} onChange={e=>{setName(e.target.value)}}/>    
  //   <input type="password" placeholder="password" value={password} onChange={e=>{setPassword(e.target.value)}}/>    
  //   <input type="text" placeholder="email" value={email} onChange={e=>{setEmail(e.target.value)}}/>    
    
  //   {/* <div className="file-field input-field">
  //     <div className="btn #64b5f6 blue darken-1">
  //       <span>Upload Pic</span>
  //       <input type="file" onChange={event=>setImage(event.target.files[0])}/>
  //     </div>
  //     <div className="file-path-wrapper">
  //       <input className="file-path validate" type="text"/>
  //     </div>
  //   </div> */}

  // <button className="btn waves-effect waves-light #64b5f6 blue darken-1" type="submit" onClick={()=>PostData()}>
  // Signup
  // </button>    
  // <h5>
  //     <Link to="/signin">Already have an account?</Link>
  // </h5>
  //   </div>
  //   </div>


  <div style={{width:"500px",marginLeft:"430px"}}>
<div class="ui attached message">
  <div class="content">
    <div class="header">Welcome to  IMDB!</div>
    <p>Fill out the form below to sign-up for  new account</p>
  </div>
</div>
{
        error? <div class="ui negative message">
        <div class="header">{error}</div>
       
      </div>:""
}
<form class="ui form attached fluid segment">
    <div class="field">
      <label>Name</label>
      <div class="ui fluid input"><input  type="text" placeholder="name" value={name} onChange={e=>{setName(e.target.value)}}     /></div>
    </div>
    <div class="field">
    <label>Password</label>
    <div class="ui fluid input"><input type="password" placeholder="password" value={password} onChange={e=>{setPassword(e.target.value)}} /></div>
  </div>
  <div class="field">
    <label>Email</label>
    <div class="ui  fluid input"><input  type="text" placeholder="email" value={email} onChange={e=>{setEmail(e.target.value)}}/></div>
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
   <Link to="/signin">Already have an account?</Link>
</div>
</div>

    
    )


}
export default Signup