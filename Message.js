
import { StyleSheet, Text, View, TextInput, FlatList, Button} from 'react-native';
import styles from './styles'
import React, { useEffect, useState } from 'react';

import axios from 'axios';



function Message(props){

    const [message, setMessage] =useState("")
    const geoApiRest = "https://api-adresse.data.gouv.fr/reverse/"
    const messApiRest = "https://api.dunarr.com"


    function handleNewMessage(newMessage) {
        setMessage(newMessage)
    }

    function sendMessage(){
        axios.post(messApiRest+"/api/messages",
    {
      'message' : message,
      'category' : 1,
      'citycode' : props.cityCode,
    },
    {
      headers: {
          'Authorization' : "Bearer "+props.token
      }
    }
    )
    .then(response => {
      console.log(response)  

}) 

    }

    return (
        <View style={styles.container}>
        <TextInput style={styles.text_input} onChangeText={handleNewMessage} placeholder='Entrez votre message' value={message}/>
        <Button onPress={sendMessage} title='Envoyer message'/>
        </View>
    
    )

}

export default Message