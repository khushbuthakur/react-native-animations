/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import MoveBall from './src/pages/MoveBall';
import SwipeCards from './src/pages/SwipeCards';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <SwipeCards/>
        {/* <MoveBall/> */}
      </SafeAreaView>
    </>
  );
};


export default App;
