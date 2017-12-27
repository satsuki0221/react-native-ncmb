import RoleCore from './RoleCore';
export default class Create extends RoleCore {
    only(objectId) {
        return this.ncmb.api({
            method: 'PUT',
            endpoint: `roles/${objectId}`,
            sessionToken: false
        });
    }
    belongUser(options) {
        return this.ncmb.api({
            query: {
                belongUser: this.createBelongData('user', options.registerIds)
            },
            method: 'PUT',
            endpoint: `roles/${options.objectId}`,
            sessionToken: false
        });
    }
    belongRole(options) {
        return this.ncmb.api({
            query: {
                belongRole: this.createBelongData('role', options.registerIds)
            },
            method: 'PUT',
            endpoint: `roles/${options.objectId}`,
            sessionToken: false
        });
    }
}
