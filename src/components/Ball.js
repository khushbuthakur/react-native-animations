import React from 'react'
import {View, StyleSheet} from 'react-native'

const Ball = () => <View style={styles.ball}/>

const styles = StyleSheet.create({
  ball: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    backgroundColor : '#333'
  }
});

export default Ball
