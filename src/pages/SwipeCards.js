import React, {useEffect, useState} from 'react'
import { View, Text, ScrollView, Animated, PanResponder } from 'react-native'
import axios from 'axios';
import Card from '../components/Card';

/*
    pan responder -> for input - handeled by gesture system
    animated -> for output - handeled by animated system
*/ 

/*
Gesture system questions

*/

const SwipeCards = () => {
    const [users, setUsers] = useState([])

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

    return (
       <ScrollView horizontal={true}>
           {users.map((item)=>{
               return <Card item={item} key={item.id}/>
           })}
       </ScrollView>
    )
}

export default SwipeCards
