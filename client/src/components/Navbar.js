import React,{useState,useContext} from 'react';
import {Link,useHistory} from 'react-router-dom'
import Search from './Search'
import {UserContext} from '../App'
function Navbar(){
const history=useHistory()
const [moviename,setMoviename]=useState("")
const [data,setData]=useState("")
const {state,dispatch}=useContext(UserContext)
const renderlist=()=>{
  
  const search=(movie)=>{
    if(search)  
    {const moviename =movie.toUpperCase()
    fetch(`/search?moviename=${moviename}`,{
      headers:{
          Authorization:"Bearer "+localStorage.getItem("token")
      }
  }).then(res=>res.json())
  .then(result=>{
    localStorage.setItem("movie",JSON.stringify(result))   
    dispatch({type:"SEARCH",payload:result})
    if(result.err)
    history.push('/search')
    else
    history.push('/showmovie')
  })
  }
}
  const user=JSON.parse(localStorage.getItem("user"))
    if(user){
      console.log("user")
    return [
       <div class="ui  icon input">
       <input type="text" style={{marginLeft:"4px",marginTop:"4px",
      marginBottom:"4px"}} value={moviename} className="prompt" 
       onChange={(e)=>setMoviename(e.target.value)} placeholder="Search ..." />
       <i class="search link icon" onClick={()=>search(moviename)}></i>
     </div>,
      
     <div class="item"><button  type="submit" className="ui primary button" onClick={()=>{
       localStorage.clear()
       dispatch({type:"CLEAR"})
    
       history.push('/signin')
     }}>Log Out </button></div>
    ]
  }
  else{
    return[
      <div style={{padding:"22px"}}>
  <h3  className="ui right floated header"><Link style={{color:"white"}}  to="/signin">Signin</Link>
    </h3>
    <h3   className="ui right floated header">  <Link style={{color:"white"}} to="/signup">Signup</Link>
  
    </h3>
  
  </div> 
    
    ]
  }

} 
return(
  
<div className="ui small menu" style={{backgroundColor:"black",height:"70px"}}>
<div className="left menu">
      <div className="ui clearing segment" style={{backgroundColor:"yellow",marginLeft:"4px",marginTop:"4px",
      marginBottom:"4px"}}>
    <h3 className="ui left floated header"  >  <Link to="/">Imdb</Link>
  
    </h3>
    </div>
    
    </div>
    <div class="ui inverted segment" >
  <Link to='/wishlist'><i style={{
      bottomTop:"1px"}} aria-hidden="true" class="red heart big icon"></i></Link>
  </div> 
   
  <div className="right menu">
    
    {renderlist()}
    
    </div>
  </div>


  )
}


export default Navbar;