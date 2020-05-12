export const initialstate=null
export const Userreducer=(state,action)=>{

    if(action.type=="SEARCH")
    return {...state,movie:action.payload}
    if(action.type=="CLEAR"){
        return null
    }
    if(action.type=="USER")
    {
        return action.payload
    }
    if(action.type=="UPDATE")
    {
        return{
            ...state,
            wishlist:action.payload,
            
        
        }
    }
    return state

}