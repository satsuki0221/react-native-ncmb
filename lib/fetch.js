// @flow
import Signature from './signature';

const defaultSuccess = (json) => {
  console.log(json);
  return json;
};

const defaultError = (errorCode) => {
  console.log(errorCode);
  return errorCode;
};

export default (
  ncmb: any,
  options: {|
    method: MethodType,
    endpoint: string,
    query: {[key: string]: string | number},
    beforeFetch: ?Function,
    beforeSuccess: ?Function,
    success: Function,
    beforeError: ?Function,
    error: Function,
  |},
) => {
  const {
    method,
    endpoint,
    query,
    beforeFetch,
    beforeSuccess,
    success,
    beforeError,
    error,
  } = options;

  const nowTime = (new Date()).toISOString();
  const signature = Signature(
    ncmb,
    { method,
      endpoint,
      nowTime,
      query,
    },
  );

  const bf = beforeFetch;
  const bs = beforeSuccess;
  const be = beforeError;

  const queryParameter = ncmb.sortObjectConvertToParameter(query);

  let fetchUrl = `${ncmb.url}/${endpoint}`;

  if (method === 'GET') fetchUrl += `?${queryParameter}`;
  if (bf) bf();

  fetch(fetchUrl, {
    method,
    headers: {
      'X-NCMB-Application-Key': ncmb.applicationkey,
      'X-NCMB-Timestamp': nowTime,
      'X-NCMB-Signature': signature,
      'Content-Type': 'application/json',
    },
    body: method === 'POST' ? JSON.stringify(query) : null,
  })
  .then(response => response.json())
  .then((json) => {
    if (bs) bs(json);
    return success ? success(json) : defaultSuccess(json);
  })
  .catch((errorCode) => {
    if (be) be(errorCode);
    return error ? error(errorCode) : defaultError(errorCode);
  });
};
