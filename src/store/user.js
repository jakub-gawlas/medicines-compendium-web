import { observable, action } from 'mobx';

class StoreUser {

  @observable 
  isLoggedIn = true

  @observable
  isLoginInProgress = false

  @observable
  loginResponse = ''

  @observable
  username = 'foo'

  @action
  login = ({ username, password }) => {

    this.isLoginInProgress = true;

    setTimeout(() => {
      this.isLoginInProgress = false;
      if( username === 'foo' && password === 'bar'){
        this.loginResponse = '';
        this.isLoggedIn = true;
        this.username = username;
        return;
      }
      this.loginResponse = 'Cannot log in. Incorrect password or username.';
    }, 1000);
    
  }

  @action
  logout = () => {
    this.isLoggedIn = false;
  }

}

const storeUser = new StoreUser();
export default storeUser;