// @flow
import type NCMB from './ncmb';
import Signature from './signature';

export default (
  ncmb: NCMB,
  options: {|
    method: MethodType,
    endpoint: string,
    sessionToken: boolean,
    responseContent: boolean,
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
    responseContent,
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

  const createFetchUrl = () => {
    let fetchUrl = `${ncmb.url}/${endpoint}`;
    if (method === 'GET' && query instanceof Object) {
      fetchUrl += `?${ncmb.sortObjectConvertToParameter(query)}`;
    }
    return fetchUrl;
  };

  const createHeaders = () => {
    const header: {[key: string]: string} = {
      'X-NCMB-Application-Key': ncmb.getApplicationKey(),
      'X-NCMB-Timestamp': nowTime,
      'X-NCMB-Signature': signature,
      'Content-Type': 'application/json',
    };
    if (sessionToken) {
      header['X-NCMB-Apps-Session-Token'] = ncmb.getCurrentUser().sessionToken;
    }
    return header;
  };

  const headers = createHeaders();
  const body = method === 'POST' || method === 'PUT' ? JSON.stringify(query) : null;

  if (typeof beforeFetch === 'function') beforeFetch();

  fetch(createFetchUrl(), {
    method,
    headers,
    body,
  })
  .then((response) => {
    if (response.ok && !responseContent) {
      return {
        statusCode: response.status,
        ok: response.ok,
      };
    }
    return response.json();
  })
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
