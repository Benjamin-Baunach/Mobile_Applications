//AuthService

const AuthService = {
    authToken: null,
  
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