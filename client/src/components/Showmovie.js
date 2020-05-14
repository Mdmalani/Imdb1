import React,{useState,useContext,useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import showratings from './showrating'
import Rating from './rating'
const Showmovie=()=>{
    const {state,dispatch}=useContext(UserContext)

    const history=useHistory()
    //const newData=[]
    const [text,setText]=useState("")
const [data,setData] =useState()
const [scount,setScount]=useState(0)
const [count,setCount]=useState(1)
const user=JSON.parse(localStorage.getItem("user"))
if(!user){

    history.push('/signin')
}
useEffect(()=>{
        
    setData(state.movie)
    console.log(state)   
    },[state.movie])
        
       



const makecomment=(e,text,id)=>{
    e.preventDefault()
    // console.log(text)    
    // console.log(id)
    fetch('/makecomment',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("token")
        },
        body:JSON.stringify({
            text:text,
            id:id
        })
    }).then(res=>res.json())
    .then(result=>{
         console.log(result.poster)
        // const newData=data.filter(item=>{
        //   if( item._id==result._id)
        //     return result
        //     else
        //     return item
        // })
         setData(result)                        
         //console.log(result)
        })


}
if(data){
    if(data.err)
    history.push('/search')
console.log(data)
    return(
             
     <div>
            <div style={{marginLeft:"100px",backgroundColor:"black",
                marginRight:"100px",padding:"40px"}}>
                <div class="ui fluid centered card">
  <div class="image" ><img style={{height:"400px"}} src={data.poster} /></div>
  <div class="content">
    <div class="header">{data.title}</div>
    <div class="meta"><span class="date">Release Year:{data.year} </span></div>
            <div class="description">Plot :{data.plot}</div>
  </div>
                    <div class="content">
                      {/* <div class="metadata"><div>Just now</div></div> */}
                     {
                        data.comments.map(record=>{
                              return(
                               <div className="content">
                    <a class="author">{ record.postedBy.name
                    
                    }</a>
                   
                       <Rating n={3}/>
                   
                   <div class="text">{record.text} </div>  
                            </div>
                                       )
                                    })
                    }
                 
                 </div>
  <div class="extra content">
      {data.comments.length} raitng
      <div>
      <form class="ui reply form" >
    <div class="field"><textarea rows="3" value={text} onChange={(e)=>setText(e.target.value)} ></textarea></div>
    <button  onClick={(e)=>{
        e.preventDefault();
        makecomment(e,text,data._id)}} class="ui icon primary left labeled button">
      <i aria-hidden="true" class="edit icon"></i>
      Add Reply
    </button>
  </form>
</div>
   </div>
</div>
                </div>
                }
    
                </div>    
)
    
            
}
else{
    return(<div>
        loading
    </div>)
}

}
export default Showmovie

