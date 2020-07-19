import React, {useEffect, useState, useRef} from 'react'
import { View, Text, ScrollView, Animated, PanResponder } from 'react-native'
import axios from 'axios';
import Card from '../components/Card';
import { WINDOW_WIDTH } from '../utils/styles';

/*
    pan responder -> for input - handeled by gesture system
    animated -> for output - handeled by animated system
*/ 

/*
Gesture system questions

*/

const SwipeCards = () => {
    const [users, setUsers] = useState([]);

    const position = useRef(new Animated.ValueXY()).current;

    const swipePanResponder = useRef(PanResponder.create({
            /* 
            1. What are we touching? 
                ->  This is called when we start touching.
            this specifices if swipePanResponder method should be used 
            when user starts interacting with the card. 
            It is a function so that we can run some conditions to pass true based on values
            */
            onStartShouldSetPanResponder : () => true,

            /* This is called when we start moving element */
            onPanResponderMove : (event, gestureState) => {

                // console.log(gestureState);

                /*
                // one single gesture
                dx: 1.5  -> total distance - user clicking on screen then dragging on side and then letting go
                dy: 0 -> total distance - user clicking on screen then dragging on side and then letting go
                
                // where user is clicking down and pressing over
                moveX: 97
                moveY: 209
                
                numberActiveTouches: 1
                stateID: 0.12758590268635328

                // units of how quickly user is moving over
                vx: 2.051742861720509e-7
                vy: 0

                x0: 95.5
                y0: 209
                _accountsForMovesUpTo: 7310857.651734001
                */
                position.setValue({x : gestureState.dx, y : gestureState.dy});
            },

            /* when let goes the element  */
            onPanResponderRelease : () =>{
                resetPostion();
            }
        })
    ).current

    const fetchUsers = () =>{
        axios.get('https://reqres.in/api/users?page=1')
            .then(response => {
                // handle success
                // console.log(response);

                let {data} = response;
                let userData = data.data;
                setUsers(userData);
                // console.log(data.data)
            })
            .catch( error => {
                // handle error
                console.log(error);
            })
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const getCardStyle = () =>{
        const width = WINDOW_WIDTH * 2;
        // we will interpolate on x, this will rotate card as we move it
        const rotate = position.x.interpolate({
            inputRange : [-width,0,width],
            outputRange : ['-120deg', '0deg', '120deg']
        });

        /* this values are inter-related. 
            so at -500px position card will be rotated -120 deg. 
            At 0, card will be rotated 0 deg
        */ 
        return {transform:[...position.getTranslateTransform(), {rotate}]}
    }

    const resetPostion = () =>{
        Animated.spring(position,{
            toValue : {x:0,y:0},
            useNativeDriver : true
        })
    }

    return (
        <View>
        {/* <Animated.View style={position.getLayout()} {...swipePanResponder.panHandlers}> */}
        {/*  <ScrollView horizontal={true}> */}
           {users.map((item, index)=>{
               if(index === 0){
                return (<Animated.View 
                    style={getCardStyle()}
                        {...swipePanResponder.panHandlers} 
                        key={item.id}>
                            <Card item={item} key={item.id}/>
                       </Animated.View>
                    )
               }else{
                return <Card item={item} key={item.id}/>
               }
           })}
          {/*  </ScrollView> */}
          {/* </Animated.View> */}
    </View>
    )
}

export default SwipeCards
