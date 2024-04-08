//API fetches
export default {
  baseURL: "https://www2.hs-esslingen.de/~melcher/map/chat/api/",

  async postData(data) {
    const response = await fetch(this.baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  async getData(request) {
    const response = await fetch(`${this.baseURL}?request=${request}`);
    return await response.json();
  },

  async register({username, password, userid, fullname, nickname}) {
      return await this.postData({
          request: 'register',
          userid: userid,
          password: password,
          nickname: nickname,
          fullname: fullname,
      });
  },

  async deregister(username, password) {
    return await this.postData({
      request: "deregister",
      username: username,
      password: password,
    });
  },

  async login(userid, password) {
    return await this.postData({
      request: "login",
      userid: userid,
      password: password,
    });
  },

  async logout(username, password) {
    return await this.postData({
      request: "logout",
      username: username,
      password: password,
    });
  },

  async validatetoken(token) {
    try {
      const response = await fetch(`https://www2.hs-esslingen.de/~melcher/map/chat/api/?request=validatetoken&token=${token}`);
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Fehler beim Validieren des Tokens: Serverantwort fehlerhaft.');
      }
    } catch (error) {
      console.error('Fehler beim Validieren des Tokens:', error);
      throw error;
    }
  },

  async getmessages({token}) {
      const response = await fetch(`${this.baseURL}?request=getmessages&token=${token}`);
      return await response.json();
  },

  async getphoto({token}) {
    const response = await fetch(`${this.baseURL}?request=getphoto&token=${token}`);
    return await response.json();
  },

  async ping() {
    return await this.getData("ping");
  },

  async sendmessage({token, message, chatid}) {
    return await this.postData({
      request: "postmessage",
      token: token,
      text: message,
      chatid: chatid,
    });
  }
};
