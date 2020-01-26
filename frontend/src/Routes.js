import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'; 
//will make the props available to nested components
import Signin from './user/Signin';
import Signup from './user/Signup';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Dashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';




// it is about Switch and Route, not normal Router and Link. don't get confused. 

const Routes = () =>{
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
      </Switch>
    </BrowserRouter>

    // <div>
    //   <Switch>
    //     <Route path="/signin" exact={Signin} />
    //     <Route path="/signup" exact={Signin} />
    //   </Switch>
    // </div>
  );
}

export default Routes; 
 