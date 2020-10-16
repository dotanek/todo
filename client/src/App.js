import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import List from './components/List/List';
import SignIn from './components/SignIn/SignIn';

class App extends Component {
  state = {  }
  render() { 
    return (
      <Router>
         <Route exact path='/sign-in' component={SignIn} />
         <Route exact path='/(|home|list)/' component={List} />
      </Router>
    );
  }
}
 
export default App;
