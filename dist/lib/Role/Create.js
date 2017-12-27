import RoleCore from './RoleCore';
export default class Create extends RoleCore {
    only(query) {
        return this.ncmb.api({
            query,
            method: 'POST',
            endpoint: 'roles',
            sessionToken: false
        });
    }
    belongUser(options) {
        return this.ncmb.api({
            query: {
                roleName: options.roleName,
                belongUser: this.createBelongData('user', options.registerIds)
            },
            method: 'POST',
            endpoint: 'roles',
            sessionToken: false
        });
    }
    belongRole(options) {
        return this.ncmb.api({
            query: {
                roleName: options.roleName,
                belongRole: this.createBelongData('role', options.registerIds)
            },
            method: 'POST',
            endpoint: 'roles',
            sessionToken: false
        });
    }
}
