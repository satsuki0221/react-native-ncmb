import Core from 'lib/Core';
export default class RollCore extends Core {
    createBelongData(className, registerIds) {
        return {
            __op: 'AddRelation',
            objects: registerIds.map(id => {
                return Object.assign({ objectId: id }, { className, __type: 'Pointer' });
            })
        };
    }
}
