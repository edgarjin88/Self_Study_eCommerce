import React from 'react'
import Menu from './Menu'

const Layout = ({title="Title", description ="Description", className, children}) =>{
  return (
    <div>
      <Menu/>
      <div className="jumbotron">
        <h2>{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={"container col-md-8 offset-md-2"}>{children}</div>
      {/* container for children.  */}
    </div>
  );
}


export default Layout