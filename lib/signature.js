// @flow
import jsSHA from 'jssha';

export default (
  ncmb: any,
  options: {|
    method: string,
    endpoint: string,
    nowTime: string,
    query: {[key: string]: string},
  |},
) => {
  const sha256 = new jsSHA('SHA-256', 'TEXT');

  const signatureObject = {
    SignatureMethod: ncmb.signatureMethod,
    SignatureVersion: ncmb.signatureVersion,
    'X-NCMB-Application-Key': ncmb.applicationkey,
    'X-NCMB-Timestamp': options.nowTime,
  };

  if (options.method === 'GET') {
    Object.keys(options.query).forEach((key) => {
      let q = options.query[key];
      if (typeof q === 'object') q = JSON.stringify(q);
      signatureObject[key] = encodeURIComponent(q);
    });
  }


  sha256.setHMACKey(ncmb.clientKey, 'TEXT');

  sha256.update(
    [
      options.method,
      ncmb.fqdn,
      `/${ncmb.version}/${options.endpoint}`,
      ncmb.sortObjectConvertToParameter(signatureObject),
    ].join('\n'),
  );
  return sha256.getHMAC('B64');
};
