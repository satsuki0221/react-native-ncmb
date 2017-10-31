import ncmb from 'ncmb';
import { api } from 'utils/index';
import Core from 'lib/Core';

export type RollName = { roleName: string };
export type ObjectIds = string[];
export type Objects = {
  __type: string,
  className: string,
  objectId: string,
}[];

export type Belong = {
  __op: string,
  objects: Objects,
};
export type Options = RollName & {
  registerIds: ObjectIds,
};

export default abstract class RollCore extends Core {

  createBelongData(className: string, registerIds: ObjectIds): Belong {
    return {
      __op: 'AddRelation',
      objects: registerIds.map((id) => {
        return Object.assign({ objectId: id }, { className, __type: 'Pointer' });
      }),
    };
  }

}
