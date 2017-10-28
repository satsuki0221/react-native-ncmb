import { Generic } from 'types/index';
import User from 'lib/User';
import Objects from 'lib/Objects';
import { signature, api } from 'utils/index';

export type CreateSignature = {
  method: string,
  endpoint: string,
  nowTime: string,
  query: { [key: string]: string },
};

export type Api = {
  method: string,
  endpoint: string,
  sessionToken: boolean,
  query?: { [key: string]: string },
};


export default class NCMB {

  private applicationkey: string | null = null;
  private clientKey: string | null = null;
  private currentUser: null | {[key: string]: string} = null;

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

  user: User;
  object: Objects;

  constructor() {
    this.user = new User(this);
    this.object = new Objects(this);
  }

  set(keys: { applicationkey: string, clientKey: string }) {
    this.applicationkey = keys.applicationkey;
    this.clientKey = keys.clientKey;
  }

  setCurrentUser = (res: Generic) => {
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

  createSignature = (options: CreateSignature) => {
    return signature(this, options);
  }

  api = (options: Api) => {
    return api(this, options)().then((res: any) => {
      if (res.ok) return res;
      throw new Error(res.statusText);
    });
  }
}
