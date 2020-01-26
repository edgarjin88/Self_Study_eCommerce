import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

const AdminRoute = ({ component: Component, ...rest }) => {
  // distructure component, and again distructure component:{Component:Component}, Component
  return (
    <Route
      {...rest}
      render={props => {
        return isAuthenticated() && isAuthenticated().user.role===1 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

export default AdminRoute;
