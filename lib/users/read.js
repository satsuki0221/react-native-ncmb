// @flow
import type NCMB from '../ncmb';
import Fetch from '../fetch';

export default (
  ncmb: NCMB,
  options: {
    success: Function,
    error: Function,
  },
) => {
  const {
    success,
    error,
  } = options;

  if (ncmb.notCurrentuser(error, 'currentUser is undefind')) return;

  if (typeof ncmb.currentUser === 'string') {
    const objectId = ncmb.currentUser.objectId;
    Fetch(
      ncmb,
      {
        method: 'GET',
        endpoint: `users/${objectId}`,
        sessionToken: true,
        responseContent: true,
        query: null,
        success,
        error,
        beforeFetch: null,
        beforeSuccess: null,
        beforeError: null,
      },
    );
    return;
  }

  error({ code: '', error: 'An unexpected error occurred' });
};
