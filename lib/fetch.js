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
    query: {[key: string]: string},
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

  let fetchUrl = `${ncmb.url}/${endpoint}`;

  if (method === 'GET') fetchUrl += `?${ncmb.sortObjectConvertToParameter(query)}`;

  if (typeof beforeFetch === 'function') beforeFetch();

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
    if (typeof beforeSuccess === 'function') beforeSuccess(json);
    return success ? success(json) : defaultSuccess(json);
  })
  .catch((errorCode) => {
    if (typeof beforeError === 'function') beforeError(errorCode);
    return error ? error(errorCode) : defaultError(errorCode);
  });
};
