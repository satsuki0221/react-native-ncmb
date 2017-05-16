// @flow
import jsSHA from 'jssha';

export default (
  ncmb: any,
  options: {|
    method: string,
    endpoint: string,
    nowTime: string,
    query: ?{[key: string]: string},
  |},
) => {
  const {
    method,
    endpoint,
    nowTime,
    query,
  } = options;

  const sha256 = new jsSHA('SHA-256', 'TEXT');

  const signatureObject = {
    SignatureMethod: ncmb.signatureMethod,
    SignatureVersion: ncmb.signatureVersion,
    'X-NCMB-Application-Key': ncmb.applicationkey,
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


  sha256.setHMACKey(ncmb.clientKey, 'TEXT');

  sha256.update(
    [
      method,
      ncmb.fqdn,
      `/${ncmb.version}/${endpoint}`,
      ncmb.sortObjectConvertToParameter(signatureObject),
    ].join('\n'),
  );
  return sha256.getHMAC('B64');
};
