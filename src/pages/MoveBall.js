import React, {useRef, useEffect} from 'react'
import {View, Animated, StyleSheet, Button} from 'react-native'
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../utils/styles';

/*
    Always ask these 3 questions before starting aniamtions

    1. Where is element to animate right now. Exact X,Y positions.
    2. Where is this element moving?
    3. Which element are we moving?

    For example if want to move ball from top to bottom ans would be
    1. It is at 200,500
    2. It will move downwards
    3. It is a ball
*/ 

const MoveBall = () => {
  // initial position of ball
 //                                            x , y
  const position = useRef(new Animated.ValueXY(0, 0)).current;

  useEffect(() => {
    /*   all works good till time we do not comment out below line, i.e. 
         when main js thread is exectuing below line, animation lags */

      const arr = new Array(5000).fill(0).map(item=>console.log(item));
  }, []);

  const slideBtn = (type) =>{
    Animated
        .spring(position, {
        toValue: {
        x: type === 'UP' ? 0 : WINDOW_WIDTH - 200,
        y: type === 'UP' ? 0 : WINDOW_HEIGHT - 200
        },
        useNativeDriver: true, // set to true 
        duration : 5000
    }).start();

    /*
    reason for  :  useNativeDriver: true,

    The Animated API is designed to be serializable.
     By using the native driver, we send everything about the animation to native before 
     starting the animation, allowing native code to perform the animation on the UI thread 
     without having to go through the bridge on every frame. 
    Once the animation has started, the JS thread can be blocked without affecting the animation.
    */ 
  }

  return (
      <View>
          {/* updated code which does not lags */}

          {/*position.getTranslateTransform() gives output in form : 
             [{"translateX": 0}, {"translateY": 0}] */}

          <Animated.View style={[styles.ball, 
            {transform : position.getTranslateTransform()}
            ]}>
         </Animated.View>

         {/* this below code lags */}
        {/* <Animated.View style={position.getLayout()}>
          <View style={styles.ball}/>
        </Animated.View> */}

        <Button title="Slide Down" onPress={()=>{slideBtn('DOWN')}}></Button>
        <Button title="Slide Up" onPress={()=>{slideBtn('UP')}}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  ball: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: '#333'
  }
});

export default MoveBall
