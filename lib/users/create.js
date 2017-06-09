// @flow
import type NCMB from '../ncmb';
import Fetch from '../fetch';

export default (
  ncmb: NCMB,
  options: {
    query: {[key: string]: string},
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
      endpoint: 'users',
      sessionToken: false,
      responseContent: true,
      query,
      success,
      error,
      beforeFetch: null,
      beforeSuccess: (json) => {
        ncmb.setCurrentUser(json);
      },
      beforeError: null,
    },
  );
};
