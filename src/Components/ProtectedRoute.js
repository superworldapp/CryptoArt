import React from 'react';
import { Redirect } from 'react-router-dom';
import Auth from './Auth';

class ProtectedRoute extends React.Component {
  render() {
    const Component = this.props.component;
    const isAuthenticated = Auth.getAuth();

    return isAuthenticated ? (
      <Component />
    ) : (
      <Redirect to={{ pathname: '/home' }} />
    );
  }
}

export default ProtectedRoute;
