
import { signature, api } from './utils/index';
import user from './lib/user';

export default class NCMB {

  applicationkey: string | null = null;
  clientKey: string | null = null;
  currentUser: null | {[key: string]: string} = null;

  user: any;

  version = '2013-09-01';
  scriptVersion = '2015-09-01';
  fqdn = 'mb.api.cloud.nifty.com';
  scriptFqdn = 'script.mb.api.cloud.nifty.com';
  port = 443;
  protocol = 'https:';
  signatureMethod = 'HmacSHA256';
  signatureVersion = 2;
  stub = false;
  url = `${this.protocol}//${this.fqdn}/${this.version}`;


  constructor() {
    this.user = new user(this);
  }

  set(keys: { applicationkey: string, clientKey: string }) {
    this.applicationkey = keys.applicationkey;
    this.clientKey = keys.clientKey;
  }

  setCurrentUser = (res: {[key: string]: string}) => {
    this.currentUser = res;
  }

  getCurrentUser = () => {
    if (this.currentUser) {
      return this.currentUser;
    }
    throw new Error('currentUser is undefind');
  }

  deleteCurrentUser = () => {
    this.currentUser = null;
  }

  getApplicationKey = () => {
    if (typeof this.applicationkey === 'string') return this.applicationkey;
    throw new Error('Please set the applicationkey');
  }

  getClientKey = () => {
    if (typeof this.clientKey === 'string') return this.clientKey;
    throw new Error('Please set the clientKey');
  }

  createSignature = (
    options: {
      method: string,
      endpoint: string,
      nowTime: string,
      query: { [key: string]: string },
    },
  ) => {
    return signature(this, options);
  }

  api = (
    options: {
      method: string,
      endpoint: string,
      sessionToken: boolean,
      query: { [key: string]: string },
    },
  ) => {
    return api(this, options)().then((res: any) => {
      if (res.ok) return res;
      throw new Error(res.statusText);
    });
  }

}
