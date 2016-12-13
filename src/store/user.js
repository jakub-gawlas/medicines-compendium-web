import { observable, action } from 'mobx';

import { loginUser } from '../api';

class StoreUser {

  @observable 
  isLoggedIn = false

  @observable
  isLoginInProgress = false

  @observable
  loginResponse = ''

  @observable
  username = ''

  @action
  login = async ({ username, password }) => {
    this.isLoginInProgress = true;

    try {
      await loginUser({ username, password });
      this.isLoggedIn = true;
      this.username = username;
      this.loginResponse = '';
    }
    catch(err){
      console.error(err);
      
      this.loginResponse = 'Niepoprawna nazwa użytkownika lub hasło.';
    }

    this.isLoginInProgress = false;
  }

  @action
  logout = () => {
    this.isLoggedIn = false;
  }

}

const storeUser = new StoreUser();
export default storeUser;