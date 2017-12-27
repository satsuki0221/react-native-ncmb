import Core from 'lib/Core';
export default class User extends Core {
    login(query) {
        return this.ncmb
            .api({
            query,
            method: 'GET',
            endpoint: 'login',
            sessionToken: false
        })
            .then((res) => {
            return res.json();
        })
            .then((res) => {
            this.ncmb.setCurrentUser(res);
            return res;
        });
    }
    logout() {
        return this.ncmb
            .api({
            method: 'GET',
            endpoint: 'logout',
            sessionToken: false
        })
            .then(() => {
            this.ncmb.deleteCurrentUser();
        });
    }
    create(query) {
        return this.ncmb
            .api({
            query,
            method: 'POST',
            endpoint: 'users',
            sessionToken: false
        })
            .then(res => {
            return res.json();
        })
            .then(json => {
            this.ncmb.setCurrentUser(json);
            return json;
        });
    }
    update(query) {
        return this.ncmb
            .api({
            query,
            method: 'PUT',
            endpoint: `users/${this.ncmb.getCurrentUser().objectId}`,
            sessionToken: true
        })
            .then((res) => {
            return res.json();
        });
    }
    read() {
        return this.ncmb
            .api({
            method: 'GET',
            endpoint: `users/${this.ncmb.getCurrentUser().objectId}`,
            sessionToken: true
        })
            .then((res) => {
            return res.json();
        });
    }
    delete() {
        return this.ncmb
            .api({
            method: 'DELETE',
            endpoint: `users/${this.ncmb.getCurrentUser().objectId}`,
            sessionToken: true
        })
            .then(res => {
            this.ncmb.deleteCurrentUser();
            return res;
        });
    }
    requestMailAddressUserEntry(query) {
        return this.ncmb
            .api({
            query,
            method: 'POST',
            endpoint: 'requestMailAddressUserEntry',
            sessionToken: false
        })
            .then((res) => {
            return res.json();
        });
    }
    requestPasswordReset(query) {
        return this.ncmb
            .api({
            query,
            method: 'POST',
            endpoint: 'requestPasswordReset',
            sessionToken: false
        })
            .then((res) => {
            return res.json();
        });
    }
}
