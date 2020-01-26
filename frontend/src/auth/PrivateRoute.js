import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from './index'


const PrivateRoute = ({component: Component, ...rest})=>{
// distructure component, and again distructure component:{Component:Component}, Component
  return <Route {...rest} render={props => {
  return isAuthenticated() 
  ? (<Component {...props}/>)
  : (<Redirect to={{pathname: '/signin', state:{from: props.location}}}/>)
  }
  }/>
}



export default PrivateRoute; 