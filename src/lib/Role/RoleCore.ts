import ncmb from 'ncmb'
import { api } from 'utils/index'
import Core from 'lib/Core'

export type Ids = string[]
export interface RollName {
  roleName: string
}
export interface Obj {
  __type: string
  className: string
  objectId: string
}

export interface Belong {
  __op: string
  objects: Obj[]
}
export interface Options extends RollName {
  registerIds: Ids
}

export default abstract class RollCore extends Core {
  createBelongData(className: string, registerIds: Ids): Belong {
    return {
      __op: 'AddRelation',
      objects: registerIds.map(id => {
        return Object.assign({ objectId: id }, { className, __type: 'Pointer' })
      })
    }
  }
}
