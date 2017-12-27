import RoleCore, { RollName, Options } from './RoleCore'

export default class Create extends RoleCore {
  only(query: RollName) {
    return this.ncmb.api({
      query,
      method: 'POST',
      endpoint: 'roles',
      sessionToken: false
    })
  }

  belongUser(options: Options) {
    return this.ncmb.api({
      query: {
        roleName: options.roleName,
        belongUser: this.createBelongData('user', options.registerIds)
      },
      method: 'POST',
      endpoint: 'roles',
      sessionToken: false
    })
  }

  belongRole(options: Options) {
    return this.ncmb.api({
      query: {
        roleName: options.roleName,
        belongRole: this.createBelongData('role', options.registerIds)
      },
      method: 'POST',
      endpoint: 'roles',
      sessionToken: false
    })
  }
}
