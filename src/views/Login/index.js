import React, { Component } from 'react';
import { observer } from 'mobx-react';

import storeUser from '../../store/user';

import LoginForm from '../../components/LoginForm';

import styles from './styles.css';


@observer
class Login extends Component {
  render(){
    const { isLoginInProgress, loginResponse, login } = storeUser; 

    return(
      <div className={styles.container}>
        <LoginForm 
          isSpinning={isLoginInProgress}
          errorMessage={loginResponse}
          onSubmitForm={login}
        />
      </div>
    );
  }
}

export default Login;