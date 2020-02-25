import auth0 from 'auth0-js';

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      // the following three lines MUST be updated
      domain: 'dev-sb1wdmd7.auth0.com',
      audience: 'https://dev-sb1wdmd7.auth0.com/userinfo',
      clientID: 'gTDjCRiSMtZXe8z9TkZDdaP7z4K1HjGH',
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'token id_token',
      scope: 'openid profile email'
    });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

  signIn() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    console.log('authentication is getting executed')
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        console.log('auth result', authResult)
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.idToken = authResult.idToken;
        this.profile = authResult.idTokenPayload;
        this.expiresAt = authResult.idTokenPayload.exp * 1000;
  
        this.setSession(authResult);
        resolve();
      });
    })
  }

  setSession (authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('user_id', authResult.idTokenPayload.sub)
    localStorage.setItem('email', authResult.idTokenPayload.name)
    localStorage.setItem('expires_at', expiresAt)
    localStorage.setItem('isLoggedIn', 'true');
  }

  signOut() {
    // clear id token, profile, and expiration
    console.log('User is being signed out')
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('user_id')
    localStorage.removeItem('email')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('isLoggedIn');
    this.idToken = null;
    this.profile = null;
    this.expiresAt = null;
    this.auth0.logout({
        returnTo: 'http://localhost:3000',
        clientID: 'gTDjCRiSMtZXe8z9TkZDdaP7z4K1HjGH',
    });
  }
}

const auth0Client = new Auth();

export default auth0Client;