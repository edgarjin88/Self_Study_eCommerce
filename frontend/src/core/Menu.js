import React from 'react'
import { Link, withRouter } from 'react-router-dom'


const isActive =(history, path) =>{
  //history is the actual browser history. 
  // path is the current path we are sending in. 
  if(history.location.pathname === path){
    return {color: '#ff9900'}
  } else{
    return {color: 'white'}; 
  }
}

const Menu = ({history}) =>{
   return (
     <div>
       <ul className="nav nav-tabs bg-primary">
         <li className="nav-item">
           <Link style={isActive(history, "/")} className="nave-link" to="/">
             Home
           </Link>
         </li>
         <li className="nav-item">
           <Link
             style={isActive(history, "/signin")}
             className="nave-link"
             to="/signin"
           >
             Sign In
           </Link>
         </li>
         <li className="nav-item">
           <Link
             style={isActive(history, "/signup")}
             className="nave-link"
             to="/signup"
           >
             Sign Up
           </Link>
         </li>
       </ul>
     </div>
   );
}

export default withRouter(Menu); 
//withRouter necessary? no. 
//yes if you want to pass props directly