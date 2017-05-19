/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import NCMB from 'react-native-ncmb';

import Login from './login';
import Register from './register';
import Home from './home';

export default class Example extends Component {
  render() {

    NCMB.set({
      applicationkey: '9aee0c6ffefde4fc9fea909074dcc7bb517b93bda535b7d6290eb04a018f8dff',
      clientKey: 'f8cf8769cdb6dae52a6f7bd400b1a170ca52e7b8d9cebdc04255da14c80f3118',
    });

    return (
      <Router>
        <Scene key="root">
          <Scene key="login" component={Login} title="Login"/>
          <Scene key="register" component={Register} title="Register"/>
          <Scene key="home" component={Home}/>
       </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Example', () => Example);
