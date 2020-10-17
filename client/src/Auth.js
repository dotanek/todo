class Auth {
    constructor() {
        this.authenticated = false;
        this.checkToken();
    }

    checkToken() {
        const token = localStorage.getItem('token');
        if (token) {
            this.authenticated = true;
        }
    }

    signIn(callback) {
        this.authenticated = true;
        callback();
    }

    signOut(callback) {
        this.authenticated = false;
        callback();
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();