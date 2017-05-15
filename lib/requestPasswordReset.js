// @flow
import Fetch from './fetch';

export default (
  ncmb: any,
  options: {
    query: {mailAddress: mixed},
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
      method: 'POST',
      endpoint: 'requestPasswordReset',
      query,
      success,
      error,
      beforeFetch: null,
      beforeSuccess: null,
      beforeError: null,
    },
  );
};
