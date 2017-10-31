import ncmb, { CreateSignature } from 'ncmb';
import * as jsSHA from 'jssha';
import { convert } from './index';

export default (
  ncmb: ncmb,
  options: CreateSignature,
) => {

  const {
    fqdn,
    version,
    signatureMethod,
    signatureVersion,
    getApplicationKey,
    getClientKey,
  } = ncmb;

  const sha256 = new jsSHA('SHA-256', 'TEXT');

  const signatureObject: {[key: string]: string | number } = {
    SignatureMethod: signatureMethod,
    SignatureVersion: signatureVersion,
    'X-NCMB-Application-Key': getApplicationKey(),
    'X-NCMB-Timestamp': options.nowTime,
  };

  if (options.method === 'GET') {
    if (options.query instanceof Object) {
      Object.keys(options.query).forEach((key) => {
        let q = options.query[key];
        if (typeof q === 'object') q = JSON.stringify(q);
        signatureObject[key] = encodeURI(q);
      });
    }
  }
  console.log(convert(signatureObject));
  sha256.setHMACKey(getClientKey(), 'TEXT');
  sha256.update(
    [
      options.method,
      fqdn,
      `/${version}/${options.endpoint}`,
      convert(signatureObject),
    ].join('\n'),
  );
  return sha256.getHMAC('B64');
};
