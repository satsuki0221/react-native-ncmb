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
        method: 'DELETE',
        endpoint: `users/${objectId}`,
        sessionToken: true,
        responseContent: false,
        query: null,
        success,
        error,
        beforeFetch: null,
        beforeSuccess: () => {
          ncmb.deleteCurrentUser();
        },
        beforeError: null,
      },
    );
    return;
  }

  error({ code: '', error: 'An unexpected error occurred' });
};
