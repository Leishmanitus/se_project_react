import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';

const ProtectedRoute = ({ children, redirect, ...props }) => {

  return (
    <Route {...props}>
      {localStorage.getItem('jwt') ? children : <Redirect to={redirect}/>}
    </Route>
  )
}

export default ProtectedRoute;
