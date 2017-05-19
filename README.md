# React-native-ncmb

http://mb.cloud.nifty.com/doc/current/rest/common/format.html

Use Nifty mobile backend 's REST API to correspond to React Native

## Install
```
yarn add react-native-ncmb
```

## Current function
- [User Registration](http://mb.cloud.nifty.com/doc/current/rest/user/userRegistration.html)
- [user Login](http://mb.cloud.nifty.com/doc/current/rest/user/userLogin.html)
- [User Get](http://mb.cloud.nifty.com/doc/current/rest/user/userGet.html)
- [Password Registration](http://mb.cloud.nifty.com/doc/current/rest/user/passwordRegistration.html)


## Setting
```
import NCMB from 'react-native-ncmb';

NCMB.set({
  applicationkey: 'abcdefghijklmnopqrstuvwxyz0123456789',
  clientKey: 'abcdefghijklmnopqrstuvwxyz0123456789',
});

```
