// @flow
import Fetch from '../fetch';

export default (
  ncmb: any,
  options: {
    success: Function,
    error: Function,
  },
) => {
  const {
    success,
    error,
  } = options;

  if (!ncmb.currentUser) throw new Error('currentUser is undefind');

  const sessionToken = ncmb.currentUser.sessionToken;
  if (!sessionToken) throw new Error('sessionToken is undefind');

  Fetch(
    ncmb,
    {
      method: 'GET',
      endpoint: `users/${ncmb.currentUser.objectId}`,
      sessionToken: true,
      query: null,
      success,
      error,
      beforeFetch: null,
      beforeSuccess: null,
      beforeError: null,
    },
  );
};
