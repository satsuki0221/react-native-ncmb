import ncmb from '../ncmb';
import { convert } from './index';

export default (
  ncmb: ncmb,
  options: {
    method: string,
    endpoint: string,
    sessionToken: boolean,
    query?: { [key: string]: string },
  },
) => {

  const {
    method,
    endpoint,
    sessionToken,
    query,
  } = options;
  const nowTime = (new Date()).toISOString();

  const signature = ncmb.createSignature({
    method,
    endpoint,
    nowTime,
    query,
  });


  const createFetchUrl = () => {
    let fetchUrl = `${ncmb.url}/${endpoint}`;
    if (method === 'GET' && query instanceof Object) {
      fetchUrl += `?${convert(query)}`;
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

  return async () => {
    return await fetch(createFetchUrl(), { method, headers, body });
  };
};
