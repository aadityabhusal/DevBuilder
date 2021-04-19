export default class Auth {
  constructor() {
    this.authentication = false;
    this.user = null;
    this.checkUser();
  }

  login(callback) {
    this.authentication = true;
    console.log("got");
    callback();
  }

  logout(callback) {
    this.authentication = false;
    callback();
  }

  checkUser() {
    this.user = { id: "user1" };
  }

  isAuthenticated() {
    return this.authentication;
  }

  get userInfo() {
    return this.user;
  }

  set userInfo(info) {
    this.user = info;
  }
}
