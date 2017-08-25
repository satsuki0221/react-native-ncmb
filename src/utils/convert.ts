export default (queryObject: { [key: string]: string | number }) => (
  Object.keys(queryObject).sort().map(key =>
    [key, queryObject[key]].join('='),
  ).join('&')
);