import React from 'react';
class Rating extends React.Component {
    state = {  
        arr:[]
    }
    componentDidMount(){
        for(var i=0;i<3;i++){
               
            this.state.arr.push(  
   //          <div class="ui star rating" role="radiogroup" tabindex="-1">
   //   <i
   //     tabindex="0"
   //     aria-checked="false"
   //     aria-posinset="1"
   //     aria-setsize="4"
   //     class="active icon"
   //     role="radio"
   //   ></i>
     
   // </div>
   <div>Hello</div>
   )
           
       }
    }
    showstars=()=>{
        for(var i=0;i<3;i++){
               
             this.state.arr.push(  
    //          <div class="ui star rating" role="radiogroup" tabindex="-1">
    //   <i
    //     tabindex="0"
    //     aria-checked="false"
    //     aria-posinset="1"
    //     aria-setsize="4"
    //     class="active icon"
    //     role="radio"
    //   ></i>
      
    // </div>
    <div>Hello</div>
    )
            
        }
    }
    
    render() { 
        return ( <div>
            {this.state.arr}
           </div> );
    }
}
 
export default Rating;