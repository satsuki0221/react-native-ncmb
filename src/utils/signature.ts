import ncmb from 'ncmb';
import * as jsSHA from 'jssha';
import { convert } from './index';

export default (
  ncmb: ncmb,
  options: {
    method: string,
    endpoint: string,
    nowTime: string,
    query: { [key: string]: string },
  },
) => {

  const {
    fqdn,
    version,
    signatureMethod,
    signatureVersion,
    getApplicationKey,
    getClientKey,
  } = ncmb;

  const {
    method,
    endpoint,
    nowTime,
    query,
  } = options;

  const sha256 = new jsSHA('SHA-256', 'TEXT');

  const signatureObject: {[key: string]: string | number } = {
    SignatureMethod: signatureMethod,
    SignatureVersion: signatureVersion,
    'X-NCMB-Application-Key': getApplicationKey(),
    'X-NCMB-Timestamp': nowTime,
  };

  if (method === 'GET') {
    if (query instanceof Object) {
      Object.keys(query).forEach((key) => {
        let q = query[key];
        if (typeof q === 'object') q = JSON.stringify(q);
        signatureObject[key] = encodeURIComponent(q);
      });
    }
  }

  sha256.setHMACKey(getClientKey(), 'TEXT');
  sha256.update(
    [
      method,
      fqdn,
      `/${version}/${endpoint}`,
      convert(signatureObject),
    ].join('\n'),
  );
  return sha256.getHMAC('B64');
};
