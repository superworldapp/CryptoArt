import Cookies from 'js-cookie';
import decode from 'jwt-decode';

const Auth = {
  isAuthenticated: false,
  user: null,
  getToken() {
    const cookie = Cookies.get('Authorization');
    // console.log("GET TOKEN");
    return cookie;
  },
  authenticate() {
    try {
      const tk = this.getToken();
      if (tk) {
        const decoded = decode(tk);
        // console.log("AUTH TEST");
        // console.log(tk);
        if (decoded.iat < Date.now() / 1000) {
          this.isAuthenticated = true;
        }
      }
    } catch (error) {
      this.isAuthenticated = false;
    }
  },
  logout() {
    Cookies.remove('Authorization');
    this.isAuthenticated = false;
  },
  getAuth() {
    // return true;
    this.authenticate();
    return this.isAuthenticated;
  },
  setUser(user) {
    this.user = user;
  },
  getUser() {
    return this.user;
  },
};
export default Auth;
