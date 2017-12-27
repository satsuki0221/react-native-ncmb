export default (queryObject) => Object.keys(queryObject)
    .sort()
    .map(key => [key, queryObject[key]].join('='))
    .join('&');
