// @flow
import Signature from './signature';

export default (
  ncmb: any,
  options: {|
    method: MethodType,
    endpoint: string,
    sessionToken: boolean,
    query: ?{[key: string]: string},
    beforeFetch: ?Function,
    beforeSuccess: ?Function,
    success: ?Function,
    beforeError: ?Function,
    error: ?Function,
  |},
) => {
  const {
    method,
    endpoint,
    sessionToken,
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

  if (method === 'GET') {
    if (query instanceof Object) {
      fetchUrl += `?${ncmb.sortObjectConvertToParameter(query)}`;
    }
  }

  const headers: {[key: string]: string} = {
    'X-NCMB-Application-Key': ncmb.applicationkey,
    'X-NCMB-Timestamp': nowTime,
    'X-NCMB-Signature': signature,
    'Content-Type': 'application/json',
  };

  if (sessionToken) {
    if (!ncmb.currentUser) throw new Error('currentUser is undefind');
    headers['X-NCMB-Apps-Session-Token'] = ncmb.currentUser.sessionToken;
  }

  if (typeof beforeFetch === 'function') beforeFetch();

  fetch(fetchUrl, {
    method,
    headers,
    body: method === 'POST' ? JSON.stringify(query) : null,
  })
  .then(response => response.json())
  .then((json) => {
    if (!json.error) {
      if (typeof beforeSuccess === 'function') beforeSuccess(json);
      if (typeof success === 'function') success(json);
    } else {
      if (typeof beforeError === 'function') beforeError(json);
      if (typeof error === 'function') error(json);
    }
  })
  .catch((Error) => {
    const errorObj = {
      code: null,
      error: Error.message,
    };

    if (typeof beforeError === 'function') beforeError(errorObj);
    if (typeof error === 'function') error(errorObj);
  });
};
