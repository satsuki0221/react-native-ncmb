// @flow
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
  // sortObjectConvertToParameter: any;
  // Login: function;

  constructor ( applicationkey: string, clientKey: string ){
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
    this.url = `${this.protocol}//${this.fqdn}/${this.version}`;

    // this.Login = (param: {| userName: string, password: string |}) => {
    //   Login(this, param);
    // };
  }

  sortObjectConvertToParameter(queryObject: {[key: string]: any}) {
    return Object.keys(queryObject).sort().map(key =>
      [key, queryObject[key]].join('='),
    ).join('&')
  }
}

window.NCMB = NCMB;