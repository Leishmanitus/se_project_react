import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';

const ProtectedRoute = ({ children, ...props }) => {
  const { isLoggedIn } = useContext(CurrentUserContext);

  return (
    <Route {...props}>
      {isLoggedIn ? children : <Redirect to={'/signin'} />}
    </Route>
  )
}

export default ProtectedRoute;
