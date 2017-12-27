import User from 'lib/User'
import Objects from 'lib/Objects'
import Role from 'lib/Role/index'
import { signature, api } from 'utils/index'
export default class NCMB {
  constructor(config) {
    this.applicationkey = null
    this.clientKey = null
    this.currentUser = null
    this.version = '2013-09-01'
    this.scriptVersion = '2015-09-01'
    this.fqdn = 'mb.api.cloud.nifty.com'
    this.scriptFqdn = 'script.mb.api.cloud.nifty.com'
    this.port = 443
    this.protocol = 'https:'
    this.signatureMethod = 'HmacSHA256'
    this.signatureVersion = 2
    this.stub = false
    this.url = `${this.protocol}//${this.fqdn}/${this.version}`
    this.user = new User(this)
    this.object = new Objects(this)
    this.role = new Role(this)
    this.setCurrentUser = res => {
      this.currentUser = res
    }
    this.getCurrentUser = () => {
      if (this.currentUser) {
        return this.currentUser
      }
      throw new Error('currentUser is undefind')
    }
    this.deleteCurrentUser = () => {
      this.currentUser = null
    }
    this.getApplicationKey = () => {
      if (typeof this.applicationkey === 'string') return this.applicationkey
      throw new Error('Please set the applicationkey')
    }
    this.getClientKey = () => {
      if (typeof this.clientKey === 'string') return this.clientKey
      throw new Error('Please set the clientKey')
    }
    this.createSignature = options => {
      return signature(this, options)
    }
    this.api = options => {
      return api(this, options)().then(res => {
        if (res.ok) return res
        throw new Error(res.statusText)
      })
    }
    if (config instanceof Object) {
      this.applicationkey = config.applicationkey
      this.clientKey = config.clientkey
      this.fqdn = config.fqdn
      this.scriptFqdn = config.scriptFqdn
      this.port = config.port
      this.protocol = config.protocol
      this.stub = config.stub
    }
  }
  set(keys) {
    this.applicationkey = keys.applicationkey
    this.clientKey = keys.clientKey
  }
}
