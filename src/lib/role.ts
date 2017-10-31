import { ClassName, ObjectId } from 'types/index';
import Core from 'lib/Core';

export type RollName = { roleName: string };
export type Ids = string[];
export type Belong = {
  __op: string,
  objects:
    {
      __type: string,
      className: string,
      objectId: string,
    }[],
};
export type Options = RollName & {
  objectIds: Ids,
};

export default class Role extends Core {

  private createBelongData(objectIds: Ids): Belong {
    return {
      __op: 'AddRelation',
      objects: objectIds.map((id) => {
        return Object.assign({ objectId: id }, { __type: 'Pointer', className: 'user' });
      }),
    };
  }

  create(query: RollName) {
    return this.ncmb.api({
      query,
      method: 'POST',
      endpoint: 'roles',
      sessionToken: false,
    });
  }

  createBelongUser(options: Options) {
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
