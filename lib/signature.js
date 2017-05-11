
import jsSHA from 'jssha';

const createSignatureObject = (ncmb, nowTime, query) => {
  const data = {
    'SignatureMethod': ncmb.signatureMethod,
    'SignatureVersion': ncmb.signatureVersion,
    'X-NCMB-Application-Key': ncmb.applicationkey,
    'X-NCMB-Timestamp': nowTime,
  };
  Object.keys(query).forEach((key) => {
    let q = query[key];
    if (typeof q === 'object') q = JSON.stringify(q);
    data[key] = encodeURIComponent(q);
  });
  return data;
};

const createSignatureTextQuery = (ncmb, method, endpoint, queryObject) => (
  [
    method,
    ncmb.fqdn,
    `/${ncmb.version}/${endpoint}`,
    ncmb.sortObjectConvertToParameter(queryObject),
  ].join('\n')
);

export default (ncmb, method, endpoint, nowTime, query) => {
  const sha256 = new jsSHA('SHA-256', 'TEXT');
  sha256.setHMACKey(ncmb.clientKey, 'TEXT');
  sha256.update(
    createSignatureTextQuery(
      ncmb,
      method,
      endpoint,
      createSignatureObject(ncmb, nowTime, query),
    ),
  );
  return sha256.getHMAC('B64');
};
