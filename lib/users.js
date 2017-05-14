// @flow
import Fetch from './fetch';

export default (
  ncmb: any,
  options: {|
    query: {[key: string]: string | number},
    success: Function,
    error: Function,
  |},
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
      query,
      success,
      error,
      beforeFetch: null,
      beforeSuccess: null,
      beforeError: null,
    },
  );
};
