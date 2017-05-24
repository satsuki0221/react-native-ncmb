// @flow
import Login from './login';
import Users from './users';
import RequestPasswordReset from './requestPasswordReset';

type Options = {
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

    this.deleteCurrentUser = () => {
      this.currentUser = false;
    };

    this.setCurrentUser = (json: {[key: string]: string}) => {
      this.currentUser = json;
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

  usersCreate(options: Options) {
    Users.Create(this, options);
  }

  usersGet(options: {
    success: Function,
    error: Function,
  }) {
    Users.Get(this, options);
  }

  usersUpdate(options: Options) {
    Users.Update(this, options);
  }

  usersDelete(options: {
    success: Function,
    error: Function,
  }) {
    Users.Delete(this, options);
  }

  login(options: Options) {
    Login(this, options);
  }

  requestPasswordReset(options: {
    query: {mailAddress: string},
    success: Function,
    error: Function,
  }) {
    RequestPasswordReset(this, options);
  }

}
