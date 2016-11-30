import React, { Component } from 'react';
import { observer } from 'mobx-react'; 

import storeUser from './store/user';

import LoginView from './views/Login';
import ManagementPanelView from './views/ManagementPanel'; 

@observer
class App extends Component {
  render() {
    const { isLoggedIn } = storeUser;

    return(
      isLoggedIn ?
        <ManagementPanelView /> :
        <LoginView />
    );
  }
}

export default App;
