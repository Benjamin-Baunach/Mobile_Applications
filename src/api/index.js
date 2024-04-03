//API fetches
export default {
    baseURL: 'https://www2.hs-esslingen.de/~melcher/map/chat/api/',

    async postData(data) {
        const response = await fetch(this.baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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
            request: 'deregister',
            username: username,
            password: password
        });
    },

    async login(username, password) {
        return await this.postData({
            request: 'login',
            username: username,
            password: password
        });
    },

    async logout(username, password) {
        return await this.postData({
            request: 'logout',
            username: username,
            password: password
        });
    },

    async validatetoken(token) {
        return await this.postData({
            request: 'validatetoken',
            token: token
        });
    },

    async fetchmessages() {
        return await this.getData('fetchmessages');
    },

    async getmessages() {
        return await this.getData('getmessages');
    },

    async fetchphoto() {
        return await this.getData('fetchphoto');
    },

    async getphoto() {
        return await this.getData('getphoto');
    },

    async ping() {
        return await this.getData('ping');
    },
    
}