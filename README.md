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

# Use

## [user Login](http://mb.cloud.nifty.com/doc/current/rest/user/userLogin.html)

```
NCMB.user.login({
  userName: 'user01',
  password: 'test1234'
}).then(response => {
  console.log(response)
}).catch(error => {
  // type Error
});
```

### result

```
{
  "objectId":"09Mp23m4bEOInUqT",
  "userName":"user01",
  "mailAddress":null,
  "mailAddressConfirm":null,
  "sessionToken":"ebDH8TtmLoygzjqjaI4EWFfxc",
  "createDate":"2013-08-28T07:46:09.801Z",
  "updateDate":"2013-08-30T05:32:03.868Z"
}
```

## [user Logout](http://mb.cloud.nifty.com/doc/current/rest/user/userLogout.html)

### Only after login

```
NCMB.user.logout()
.then(response => {
  console.log(response)
}).catch(error => {
  // type Error
});
```

### result

// type Promise

## [User Create](http://mb.cloud.nifty.com/doc/current/rest/user/userRegistration.html)

```
NCMB.user.create({
  userName: 'user01',
  password: 'test1234'
})
.then(response => {
  console.log(response)
}).catch(error => {
  // type Error
});
```

### result

```
{
  "createDate":"2013-08-28T11:27:16.446Z",
  "objectId":"epaKcaYZqsREdSMY",
  "sessionToken":"iXDIelJRY3ULBdms281VTmc5O",
  "userName":"user01",
  "authData":null
}
```

## [User Read](http://mb.cloud.nifty.com/doc/current/rest/user/userGet.html)

#### Only after login

```
NCMB.user.read()
.then(response => {
  console.log(response)
}).catch(error => {
  // type Error
});
```

### result

```
{
  "objectId":"epaKcaYZqsREdSMY",
  "userName":"YamadaTarou",
  "authData":null,
  "mailAddress":null,
  "mailAddressConfirm":null,
  "createDate":"2013-08-28T11:27:16.446Z",
  "updateDate":"2013-08-28T12:03:28.926Z",
  "acl":{
    "*":{
      "read":true,
      "write":true
    }
  }
}
```

## [User Update](http://mb.cloud.nifty.com/doc/current/rest/user/userUpdate.html)

#### Only after login

```
NCMB.user.update({
  mailAddress: "new_address@mail"
  etc...
}).then(response => {
  console.log(response)
}).catch(error => {
  // type Error
});
```

### result

```
{"updateDate":"2013-08-28T12:21:17.087Z"}
```

## [User Delete](http://mb.cloud.nifty.com/doc/current/rest/user/userDelete.html)

#### Only after login

```
NCMB.user.delete()
.then(response => {
  console.log(response)
}).catch(error => {
  // type Error
});
```

### result

```
// type Promise
```

## [Password Registration](http://mb.cloud.nifty.com/doc/current/rest/user/passwordRegistration.html)

```
NCMB.user.requestPasswordReset({
	mailAddress: 'test@gmail.com'
}).then(response => {
  console.log(response)
}).catch(error => {
  // type Error
});
```

### result

```
{"createDate":"2013-09-04T04:31:43.371Z"}

```

## [Request MailForUser Authenticaiton](http://mb.cloud.nifty.com/doc/current/rest/user/requestMailForUserAuthenticaiton.html)

```
NCMB.user.requestMailAddressUserEntry({
	mailAddress: 'test@gmail.com'
}).then(response => {
  console.log(response)
}).catch(error => {
  // type Error
});
```

### result
```
{"createDate":"2013-09-04T04:31:43.371Z"}
```
