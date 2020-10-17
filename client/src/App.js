import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import auth from './Auth';

import List from './components/List/List';
import SignIn from './components/SignIn/SignIn';

const ProtectedRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated()) {
          return <Component {...props} auth={auth}/>
        } else {
          return <Redirect to='/sign-in' />
        }
      }}
    />
  );
}

const UnprotectedRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} auth={auth}/>
      }}
    />
  );
}

class App extends Component {
  state = {  }
  render() { 
    return (
      <Router>
        <UnprotectedRoute exact path='/sign-in' component={SignIn} auth={auth}/>
        <ProtectedRoute exact path='/' component={List}/>
      </Router>
    );
  }
}
 
export default App;
