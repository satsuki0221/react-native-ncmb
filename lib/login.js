// @flow
import Fetch from './fetch';

export default (
  ncmb: any,
  options: {
    query: {[key: string]: mixed},
    success: Function,
    error: Function,
  },
) => {
  const {
    query,
    success,
    error,
  } = options;

  Fetch(
    ncmb,
    {
      method: 'GET',
      endpoint: 'login',
      query,
      success,
      error,
      beforeFetch: null,
      beforeSuccess: (json) => {
        ncmb.setSessionToken(json.sessionToken);
      },
      beforeError: null,
    },
  );
};
