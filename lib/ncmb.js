// @flow
import login from './login';
import users from './users';

class NCMB {
  applicationkey: string;
  clientKey: string;
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
  sessionToken: string;
  setSessionToken: Function;
  sortObjectConvertToParameter: Function;
  login: Function;
  users: Function;

  constructor(keys: {| applicationkey: string, clientKey: string |}) {
    this.applicationkey = keys.applicationkey;
    this.clientKey = keys.clientKey;
    this.version = '2013-09-01';
    this.scriptVersion = '2015-09-01';
    this.fqdn = 'mb.api.cloud.nifty.com';
    this.scriptFqdn = 'script.mb.api.cloud.nifty.com';
    this.port = 443;
    this.protocol = 'https:';
    this.signatureMethod = 'HmacSHA256';
    this.signatureVersion = 2;
    this.stub = false;
    this.sessionToken = '';
    this.url = `${this.protocol}//${this.fqdn}/${this.version}`;

    this.setSessionToken = (token: string) => {
      this.sessionToken = token;
    };

    this.sortObjectConvertToParameter = (queryObject: {[key: string]: string & number}) => (
      Object.keys(queryObject).sort().map(key =>
        [key, queryObject[key]].join('='),
      ).join('&')
    );

    this.login = (options: {|
      query: {[key: string]: string | number},
      success: Function,
      error: Function,
    |}) => {
      login(this, options);
    };

    this.users = (options: {|
      query: {[key: string]: string | number},
      success: Function,
      error: Function,
    |}) => {
      users(this, options);
    };
  }
}

window.NCMB = NCMB;
