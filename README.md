# React-native-ncmb

http://mb.cloud.nifty.com/doc/current/rest/common/format.html

Use Nifty mobile backend 's REST API to correspond to React Native

## Install
```
yarn add react-native-ncmb
```

## Setting

#### set your initialPage

```
import NCMB from 'react-native-ncmb';

NCMB.set({
  applicationkey: 'abcdefghijklmnopqrstuvwxyz0123456789',
  clientKey: 'abcdefghijklmnopqrstuvwxyz0123456789',
});

```

## Use
- [User Registration](http://mb.cloud.nifty.com/doc/current/rest/user/userRegistration.html)


```
NCMB.userCreate({
  query: {
    'userName': 'test',
    'password': 'testtest',
     etc...
  },
  success: (json) => {
  /*
    json = {
      authData: null
      createDate: "2017-05-23T08:31:03.654Z"
      objectId: "objectID"
      sessionToken: "sessionToken"
      userName: "userName"
    }
  */
  },
  error: (json) => {
    /*
    json = {
      code: "Error Code", 
      error: "Error Message"
    }
    */
  }
})

```
- [user Login](http://mb.cloud.nifty.com/doc/current/rest/user/userLogin.html)


```
NCMB.login({
  query: {
    'userName': 'test',
    'password': 'testtest',
  },
  success: (json) => {
  /*
    json = {
      objectId: "objectID"
      userName: "test",
      etc...
    }
  */
  },
  error: (json) => {
    /*
    json = {
      code: "Error Code", 
      error: "Error Message"
    }
    */
  }
})
```

- [User Read](http://mb.cloud.nifty.com/doc/current/rest/user/userGet.html)

#### Only after login

```
NCMB.usersRead({
  success: (json) => {
  /*
    json = {
      objectId: "objectID"
      userName: "test",
      etc...
    }
  */
  },
  error: (json) => {
    /*
      json = {
        code: "Error Code", 
        error: "Error Message"
      }
    */
  }
})
```
- [Password Registration](http://mb.cloud.nifty.com/doc/current/rest/user/passwordRegistration.html)

```
NCMB.requestPasswordReset({
  query: {mailAddress: 'test@gmail.com'},
  success: (json) =>{
    /* json = { createDate: "2017-05-23T08:56:26.464Z" } */
  },
  error: (json) =>{
    /*
    json = {
      code: "Error Code",
      error: "Error Message"
    }
    */
  }
})
```
