import { Generic, Query, ClassName, ObjectId } from 'types/index'
import Core from 'lib/Core'

export interface Create extends Query, ClassName {}
export interface Options extends Query, ClassName, ObjectId {}

export default class Objects extends Core {
  create(options: Create) {
    return this.ncmb
      .api({
        query: options.query,
        method: 'POST',
        endpoint: `classes/${options.className}/`,
        sessionToken: false
      })
      .then((res: any) => {
        return res.json()
      })
  }

  read(options: Options) {
    return this.ncmb
      .api({
        query: options.query,
        method: 'GET',
        endpoint: `classes/${options.className}/${options.objectId}`,
        sessionToken: false
      })
      .then((res: any) => {
        return res.json()
      })
  }

  update(options: Options) {
    return this.ncmb
      .api({
        query: options.query,
        method: 'PUT',
        endpoint: `classes/${options.className}/${options.objectId}`,
        sessionToken: false
      })
      .then((res: any) => {
        return res.json()
      })
  }

  delete(options: Options) {
    return this.ncmb.api({
      method: 'DELETE',
      endpoint: `classes/${options.className}/${options.objectId}`,
      sessionToken: false
    })
  }

  search(options: Options) {
    const header = {
      query: {},
      method: 'GET',
      endpoint: `classes/${options.className}`,
      sessionToken: false
    }
    if (options.query instanceof Object)
      header.query = {
        where: JSON.stringify(options.query)
      }
    return this.ncmb.api(header).then((res: any) => {
      return res.json()
    })
  }
}
