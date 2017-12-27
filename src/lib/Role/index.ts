import { Generic, Query, ClassName, ObjectId } from 'types/index'
import RoleCore, { Obj, RollName } from './RoleCore'
import ncmb from 'ncmb'
import Create from './Create'
import Update from './Update'

export default class Role extends RoleCore {
  create = new Create(this.ncmb)
  update = new Update(this.ncmb)

  read(objectId: ObjectId) {
    return this.ncmb.api({
      method: 'GET',
      endpoint: `roles/${objectId}`,
      sessionToken: true
    })
  }

  delete(objectId: ObjectId) {
    return this.ncmb.api({
      method: 'DELETE',
      endpoint: `roles/${objectId}`,
      sessionToken: true
    })
  }

  search(where?: Obj) {
    const header = {
      query: {},
      method: 'GET',
      endpoint: 'roles',
      sessionToken: false
    }
    if (where instanceof Object)
      header.query = {
        where: JSON.stringify(where)
      }
    return this.ncmb.api(header).then((res: any) => {
      return res.json()
    })
  }
}
