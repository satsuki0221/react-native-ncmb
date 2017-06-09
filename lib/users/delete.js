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

  let objectId = '';
  if (!ncmb.currentUser) throw new Error('currentUser is undefind');
  if (typeof ncmb.currentUser !== 'boolean') objectId = ncmb.currentUser.objectId;

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
};
