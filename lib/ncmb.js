// @flow
import login from './login';

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
  sortObjectConvertToParameter: Function;

  constructor(applicationkey: string, clientKey: string) {
    this.applicationkey = applicationkey;
    this.clientKey = clientKey;
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


    this.sortObjectConvertToParameter = (queryObject: {[key: string]: any}) => (
      Object.keys(queryObject).sort().map(key =>
        [key, queryObject[key]].join('='),
      ).join('&')
    );
  }

  Login(options: {|
    query: { userName: string, password: string },
    success: any,
    error: any,
  |}) {
    login(this, options);
  }

}

window.NCMB = NCMB;
