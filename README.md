# React-native-ncmb

http://mb.cloud.nifty.com/doc/current/rest/common/format.html

Use Nifty mobile backend 's REST API to correspond to React Native

## install
```
yarn add react-native-ncmb
```

## Current function
- Member registration
- Member login
- Acquire member information
- Password reissue request

## Manage instances with Redux Reducer
```
import NCMB from 'react-native-ncmb';

const ncmb = new NCMB({
  applicationkey: 'abcdefghijklmnopqrstuvwxyz',
  clientKey: 'abcdefghijklmnopqrstuvwxyz',
});

export default function () {
  return ncmb;
}

```
