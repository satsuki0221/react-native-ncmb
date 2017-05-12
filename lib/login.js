// @flow
import Signature from './signature';

const success = (json) => {
  console.log(json);
  return json;
};
const error = (errorCode) => {
  console.log(errorCode);
  return errorCode;
};

export default (
  ncmb: any,
  options: {|
    query: {
      userName: string,
      password: string,
    },
    success: any,
    error: any,
  |},
) => {
  const method = 'GET';
  const endpoint = 'login';
  const nowTime = (new Date()).toISOString();

  const signature = Signature(
    ncmb,
    {
      method,
      endpoint,
      nowTime,
      query: options.query,
    },
  );
  const queryParameter = ncmb.sortObjectConvertToParameter(options.query);

  fetch(`${ncmb.url}/${endpoint}?${queryParameter}`, {
    method,
    headers: {
      'X-NCMB-Application-Key': ncmb.applicationkey,
      'X-NCMB-Timestamp': nowTime,
      'X-NCMB-Signature': signature,
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(json => (
    options.success ? options.success(json) : success(json)
  ))
  .catch(errorCode => (
    options.error ? options.error(errorCode) : error(errorCode)
  ));
};
