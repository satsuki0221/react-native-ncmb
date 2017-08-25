
import signature from './signature';

export default class NCMB {

  applicationkey: string | null = null;
  clientKey: string | null = null;
  currentUser: null | { key: string } = null;

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

  set(keys: { applicationkey: string, clientKey: string } ){
    this.applicationkey = keys.applicationkey;
    this.clientKey = keys.clientKey;
  }

  getApplicationKey = () => {
    if (typeof this.applicationkey === 'string') return this.applicationkey;
    throw new Error('Please set the applicationkey');
  };

  getClientKey = () => {
    if (typeof this.clientKey === 'string') return this.clientKey;
    throw new Error('Please set the clientKey');
  };

  createSignature = (
    options: {
      method: string,
      endpoint: string,
      nowTime: string,
      query: { [key: string]: string }
    }
  ) => {
    signature(this, options);
  }

}