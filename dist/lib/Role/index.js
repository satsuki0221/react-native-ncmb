import RoleCore from './RoleCore';
import Create from './Create';
import Update from './Update';
export default class Role extends RoleCore {
    constructor() {
        super(...arguments);
        this.create = new Create(this.ncmb);
        this.update = new Update(this.ncmb);
    }
    read(objectId) {
        return this.ncmb.api({
            method: 'GET',
            endpoint: `roles/${objectId}`,
            sessionToken: true
        });
    }
    delete(objectId) {
        return this.ncmb.api({
            method: 'DELETE',
            endpoint: `roles/${objectId}`,
            sessionToken: true
        });
    }
    search(where) {
        const header = {
            query: {},
            method: 'GET',
            endpoint: 'roles',
            sessionToken: false
        };
        if (where instanceof Object)
            header.query = {
                where: JSON.stringify(where)
            };
        return this.ncmb.api(header).then((res) => {
            return res.json();
        });
    }
}
