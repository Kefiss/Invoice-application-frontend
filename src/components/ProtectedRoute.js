import React, { Component } from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: C, appProps, ...rest })=>{
    return (
        <Route
          {...rest}
          render={props =>
            appProps.roles.includes("ROLE_ADMIN")
              ? <C {...props} {...appProps} />
              : <Navigate
                  to={`/login`}
                />}
        />
      );
          }
    export default ProtectedRoute;