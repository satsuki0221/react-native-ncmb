// @flow
import Login from './login';
import Logout from './logout';
import Users from './users';
import RequestPasswordReset from './requestPasswordReset';
import RequestMailAddressUserEntry from './requestMailAddressUserEntry';

type Options = {
  success: Function,
  error: Function,
}

type QueryOptions = {
  query: {[key: string]: string},
  success: Function,
  error: Function,
};

export default class NCMB {
  applicationkey: ?string;
  clientKey: ?string;
  version: string;
  scriptVersion: string;
  fqdn: string;
  scriptFqdn: string;
  port: number;
  protocol: string;
  signatureMethod: string;
  signatureVersion: number;
  stub: boolean;
  url: string;
  currentUser: boolean | {[key: string]: string};
  getCurrentUser: Function;
  getApplicationKey: Function;
  getClientKey: Function;
  deleteCurrentUser: Function;
  setCurrentUser: Function;
  sortObjectConvertToParameter: Function;

  constructor() {
    this.applicationkey = null;
    this.clientKey = null;
    this.version = '2013-09-01';
    this.scriptVersion = '2015-09-01';
    this.fqdn = 'mb.api.cloud.nifty.com';
    this.scriptFqdn = 'script.mb.api.cloud.nifty.com';
    this.port = 443;
    this.protocol = 'https:';
    this.signatureMethod = 'HmacSHA256';
    this.signatureVersion = 2;
    this.stub = false;
    this.currentUser = false;
    this.url = `${this.protocol}//${this.fqdn}/${this.version}`;

    this.setCurrentUser = (json: {[key: string]: string}) => {
      this.currentUser = json;
    };

    this.getCurrentUser = () => {
      if (typeof this.currentUser !== 'boolean' && !this.currentUser) {
        return this.currentUser;
      }
      throw new Error('currentUser is undefind');
    };

    this.deleteCurrentUser = () => {
      this.currentUser = false;
    };


    this.getApplicationKey = () => {
      if (typeof this.applicationkey === 'string') {
        return this.applicationkey;
      }
      throw new Error('Please set the applicationkey');
    };

    this.getClientKey = () => {
      if (typeof this.clientKey === 'string') {
        return this.clientKey;
      }
      throw new Error('Please set the clientKey');
    };

    this.sortObjectConvertToParameter = (queryObject: {[key: string]: string | number}) => (
      Object.keys(queryObject).sort().map(key =>
        [key, queryObject[key]].join('='),
      ).join('&')
    );
  }

  set(keys: {| applicationkey: string, clientKey: string |}) {
    this.applicationkey = keys.applicationkey;
    this.clientKey = keys.clientKey;
  }

  usersCreate(options: QueryOptions) {
    Users.Create(this, options);
  }

  usersRead(options: Options) {
    Users.Read(this, options);
  }

  usersUpdate(options: QueryOptions) {
    Users.Update(this, options);
  }

  usersDelete(options: Options) {
    Users.Delete(this, options);
  }

  login(options: QueryOptions) {
    Login(this, options);
  }

  logout(options: Options) {
    Logout(this, options);
  }

  requestPasswordReset(options: {
    query: {mailAddress: string},
    success: Function,
    error: Function,
  }) {
    RequestPasswordReset(this, options);
  }

  requestMailAddressUserEntry(options: {
    query: {mailAddress: string},
    success: Function,
    error: Function,
  }) {
    RequestMailAddressUserEntry(this, options);
  }

}
