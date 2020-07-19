import React from 'react'
import {
  View,
  Text,
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { WINDOW_WIDTH } from '../utils/styles';

const Card = ({item}) => {
  let {email, first_name, last_name, avatar} = item;

  return (
    <View style={styles.card}>
      <Image source={{
        uri: avatar
      }} 
      style={styles.img}
      resizeMode="cover"
      />
      <Text style={styles.text}>{first_name} {last_name}</Text>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Tap Here!</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    margin: 10,
    borderColor: 'gainsboro',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    width : WINDOW_WIDTH - 20
    // padding : 10
  },
  img: {
    height: 200,
    width: '100%',
    borderRadius: 10,
    borderBottomRightRadius : 0,
    borderBottomLeftRadius : 0,
  },
  text: {
    marginVertical: 20,
    fontSize: 20
  },
  btn : {
      marginBottom : 20,
      backgroundColor : '#87ceeb',
      padding : 10,
      borderRadius : 10,
    //   borderTopRightRadius : 0,
    //   borderTopLeftRadius : 0,
      width : '90%',
      alignItems : 'center'
  },
  btnText : {
    fontSize: 15,
    color : '#333'
  }
});

export default Card
