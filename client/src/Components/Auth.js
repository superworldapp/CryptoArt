import Cookies from 'js-cookie';
import decode from 'jwt-decode';

const Auth = {
  isAuthenticated: false,
  user: null,
  getToken() {
    const userId = Cookies.get('userId');
    const session = Cookies.get('session');
    return { userId: userId, session: session };
  },
  authenticate() {
    try {
      const tk = this.getToken();
      if (tk.session && tk.userId) {
        this.isAuthenticated = true;
      }
    } catch (error) {
      this.isAuthenticated = false;
    }
  },
  logout() {
    Cookies.remove('userId');
    Cookies.remove('session');
    Cookies.remove('email');
    localStorage.removeItem('walletType');
    localStorage.removeItem('walletConnected');
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