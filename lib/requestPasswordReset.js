// @flow
import Fetch from './fetch';

export default (
  ncmb: any,
  options: {
    query: {mailAddress: string},
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
      sessionToken: false,
      query,
      success,
      error,
      beforeFetch: null,
      beforeSuccess: null,
      beforeError: null,
    },
  );
};
