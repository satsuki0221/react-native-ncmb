import { ObjectId } from 'types/index';
import RoleCore, { ObjectIds } from './RoleCore';

export type Options = ObjectId & {
  registerIds: ObjectIds,
};

export default class Create extends RoleCore {

  only(objectId: ObjectId) {
    return this.ncmb.api({
      method: 'PUT',
      endpoint: `roles/${objectId}`,
      sessionToken: false,
    });
  }

  belongUser(options: Options) {
    return this.ncmb.api({
      query: {
        belongUser: this.createBelongData('user', options.registerIds),
      },
      method: 'PUT',
      endpoint: `roles/${options.objectId}`,
      sessionToken: false,
    });
  }

  belongRole(options: Options) {
    return this.ncmb.api({
      query: {
        belongRole: this.createBelongData('role', options.registerIds),
      },
      method: 'PUT',
      endpoint: `roles/${options.objectId}`,
      sessionToken: false,
    });
  }

}
