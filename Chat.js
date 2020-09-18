
import { StyleSheet, Text, View, TextInput, FlatList, Button, ScrollView} from 'react-native';
import styles from './styles'
import React, { useEffect, useState, Component } from 'react';
import App, {currentCityCode} from './app'
import axios from 'axios';
import {Dropdown} from 'react-native-material-dropdown';


function Chat(props) {

    const messApiRest = "https://api.dunarr.com"
    const [lastMessage, setLastMessage]= useState("")
    const [user, setUser] = useState("")
    const [categoryMessage, setcategoryMessage] = useState("")
    const [idUser, setIdUser] = useState("")
    const [allMessages, setAllMessages] = useState([])

//  let categories = [
//     {value: 1},
//     {value: 2},
//     {value: 3},
//     {value: 4},
// ]

useEffect(
    
    function getMessage(){
    
    console.log(props.token)
    console.log(props.cityCode)

    axios.get(messApiRest+"/api/messages",
    
    {
      headers: {
          'Authorization' : "Bearer "+props.token,
      },
      params: {
        'citycode' : props.cityCode
      //   'category?' : 1,
      //   'last_message?' :,
      },
    })
    .then(response => {
        setLastMessage(response.data.results[0].content)
        setIdUser(response.data.results[0].author.id)
        // console.log(idUser)
        getUserName()
        console.log(response.data.results.content)
        setAllMessages(response.data.results)
//         if(response) {
//         for (const [key, value] of Object.entries(response.data.results)) {
//             setAllMessages([...allMessages, key+" : "+value])
// }}
        
        // setAllMessages(response.data.results)
},
    
  )
},

function(){
    setInterval(1000, getMessage())
},
)

function getUserName(){
    axios.get(messApiRest+"/api/users/"+idUser,
    {
        headers:{
        'Authorization' : "Bearer "+props.token,
    }}
    )
    .then(response => {
        console.log(idUser)
        setUser(response.data.username)
        console.log(response.data.username)
    })

}

    return ( 
        <View style={styles.container}>
        {/* <Dropdown
        label="Choisissez votre catégorie"
        data={categories}/> */}

    <Text>Dernier message, de {user} : {lastMessage}</Text>

    <ScrollView>
        {allMessages.map(function (message) {
            return(
            <Text>{message.author.id} : {message.content}</Text>
            )
        })}
    </ScrollView>
        </View>


        
    )

}

export default Chat