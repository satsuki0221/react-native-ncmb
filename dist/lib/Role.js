import Core from 'lib/Core';
export default class Role extends Core {
    createBelongData(objectIds) {
        return {
            __op: 'AddRelation',
            objects: objectIds.map((id) => {
                return Object.assign({ objectId: id }, { __type: 'Pointer', className: 'user' });
            }),
        };
    }
    create(query) {
        return this.ncmb.api({
            query,
            method: 'POST',
            endpoint: 'roles',
            sessionToken: false,
        });
    }
    createBelongUser(options) {
        return this.ncmb.api({
            query: {
                roleName: options.roleName,
                belongUser: this.createBelongData(options.objectIds),
            },
            method: 'POST',
            endpoint: 'roles',
            sessionToken: false,
        });
    }
}
