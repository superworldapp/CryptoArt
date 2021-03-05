import Cookies from 'js-cookie';
import decode from 'jwt-decode';

const Auth = {
  isAuthenticated: false,
  user: null,
  getToken() {
    const session = Cookies.get('session');
    const userId = Cookies.get('userId');
    // const cookie = Cookies.get('Authorization');
    return { session, userId };
  },
  authenticate() {
    try {
      const tk = this.getToken();
      // if (tk) {
      //   const decoded = decode(tk);
      //   // console.log("AUTH TEST");
      //   // console.log(tk);
      //   if (decoded.iat < Date.now() / 1000) {
      //     this.isAuthenticated = true;
      //   }
      // }
      if (tk.session && tk.userId) {
        this.isAuthenticated = true;
      }
    } catch (error) {
      this.isAuthenticated = false;
    }
  },
  logout() {
    // Cookies.remove('Authorization');
    Cookies.remove('session', 'userId');
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
