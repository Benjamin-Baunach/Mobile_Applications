//AuthService
const storageToken = localStorage.getItem('token');

const AuthService = {
    authToken: storageToken !== null ? JSON.parse(storageToken).token : null,
  
    setAuthToken(token) {
      this.authToken = token;
    },
  
    clearAuthToken() {
      this.authToken = null;
    },
  
    isAuthenticated() {
      return this.authToken !== null;
    },
  
    getAuthToken() {
      return this.authToken;
    }
  };
  
  export default AuthService;