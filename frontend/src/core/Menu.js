import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { signout, isAuthenticated } from '../auth'
import { itemTotal } from './CartHelpers'



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
  //props.history
   return (
     <div>
       <ul className="nav nav-tabs bg-primary">
         <li className="nav-item">
           <Link style={isActive(history, "/")} className="nav-link" to="/">
             Home
           </Link>
         </li>

         <li className="nav-item">
           <Link style={isActive(history, "/shop")} className="nav-link" to="/shop">
             Shop
           </Link>
         </li>

         
         <li className="nav-item">
           <Link style={isActive(history, "/cart")} className="nav-link" to="/cart">
             Cart <sup><small className="cart-badge">{itemTotal()}</small></sup>
           </Link>
         </li>

         {isAuthenticated() && isAuthenticated().user.role === 0 && (
           <li className="nav-item">
             <Link
               style={isActive(history, "/user/dashboard")}
               className="nav-link"
               to="/user/dashboard"
             >
               Dashboard
             </Link>
           </li>
         )}

         {isAuthenticated() && isAuthenticated().user.role === 1 && (
           <li className="nav-item">
             <Link
               style={isActive(history, "/admin/dashboard")}
               className="nav-link"
               to="/admin/dashboard"
             >
               Dashboard
             </Link>
           </li>
         )}

         {!isAuthenticated() && (
           <>
             <li className="nav-item">
               <Link
                 style={isActive(history, "/signin")}
                 className="nav-link"
                 to="/signin"
               >
                 Sign In
               </Link>
             </li>
             <li className="nav-item">
               <Link
                 style={isActive(history, "/signup")}
                 className="nav-link"
                 to="/signup"
               >
                 Sign Up
               </Link>
             </li>
           </>
           //fragment to avoid broken styling
         )}

         {isAuthenticated() && (
           <>
             <li className="nav-item">
               <span
                 className="nav-link"
                 style={{ cursor: "pointer", color: "#ffffff" }}
                 onClick={() =>
                   signout(() => {
                     history.push("/");
                   })
                 }
               >
                 Sign Out
               </span>
             </li>
           </>
         )}
       </ul>
     </div>
   );
}

export default withRouter(Menu); 
//withRouter necessary? no. 
//yes if you want to pass props directly