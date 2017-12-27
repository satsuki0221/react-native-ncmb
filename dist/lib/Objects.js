import Core from 'lib/Core';
export default class Objects extends Core {
    create(options) {
        return this.ncmb
            .api({
            query: options.query,
            method: 'POST',
            endpoint: `classes/${options.className}/`,
            sessionToken: false
        })
            .then((res) => {
            return res.json();
        });
    }
    read(options) {
        return this.ncmb
            .api({
            query: options.query,
            method: 'GET',
            endpoint: `classes/${options.className}/${options.objectId}`,
            sessionToken: false
        })
            .then((res) => {
            return res.json();
        });
    }
    update(options) {
        return this.ncmb
            .api({
            query: options.query,
            method: 'PUT',
            endpoint: `classes/${options.className}/${options.objectId}`,
            sessionToken: false
        })
            .then((res) => {
            return res.json();
        });
    }
    delete(options) {
        return this.ncmb.api({
            method: 'DELETE',
            endpoint: `classes/${options.className}/${options.objectId}`,
            sessionToken: false
        });
    }
    search(options) {
        const header = {
            query: {},
            method: 'GET',
            endpoint: `classes/${options.className}`,
            sessionToken: false
        };
        if (options.query instanceof Object)
            header.query = {
                where: JSON.stringify(options.query)
            };
        return this.ncmb.api(header).then((res) => {
            return res.json();
        });
    }
}
