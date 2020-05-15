import React,{useEffect,createContext,useReducer,useContext} from 'react';
import Navbar from './components/Navbar';
import "./App.css";
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Signin from './components/Signin';
import Signup from './components/Signup';
import Search from './components/Search';

import Createpost from './components/CreatePost';
import {Userreducer,initialstate} from './reducers/Userreducer'
import Home from './components/Home';
import Showmovie from './components/Showmovie';
import Onshow from './components/Onshow';

import Wishlist from './components/Wishlist';
export const UserContext=createContext()


const Routing=()=>{
  const history=useHistory()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      console.log(user)
      

    }
    else{
      history.push('/signin')
    }
  },[])
  return(
    <Switch>
  <Route path="/" exact><Home/></Route>
  <Route path="/signin"><Signin/></Route>
  <Route path="/signup"><Signup/></Route>
  <Route path="/search"><Search/></Route>
  <Route path="/showmovie"><Showmovie/></Route>
  <Route path="/onshow/:moviename"><Onshow/></Route>
  
  <Route path="/wishlist"><Wishlist/></Route>
   
    </Switch>
 
)


}
function App() {
  const [state,dispatch]=useReducer(Userreducer,initialstate)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <Navbar />
  <Routing></Routing>    
 
    </BrowserRouter>
    </UserContext.Provider>
   )
}

export default App;
