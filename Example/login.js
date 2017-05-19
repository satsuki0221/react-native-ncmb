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
  View,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import NCMB from 'react-native-ncmb';

export default class Example extends Component {
  render() {
    console.log(NCMB, Actions);
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={ () => { Actions.register(); } }>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
        </TouchableOpacity>

        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
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
