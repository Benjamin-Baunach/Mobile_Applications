//AuthService

const AuthService = {
    authToken: JSON.parse(localStorage.getItem('token')).token ?? null,
  
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