
import { StyleSheet, Text, View, TextInput, FlatList, Button} from 'react-native';
import styles from './styles'
import React, {  useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { NativeRouter, Route, Link, Switch } from "react-router-native";

function Registration(){

    const [currentNewLogin, setCurrentNewLogin]= useState("")
    const [currentNewMdp, setCurrentNewMdp]= useState("")

    function handleCurrentNewLoginChange(text){
        setCurrentNewLogin(text)
      }
    
      function handleCurrentNewMdpChange(text){
        setCurrentNewMdp(text)
      }


    return (
        <View style={styles.container}>
    <TextInput style={styles.text_input} onChangeText={handleCurrentNewLoginChange} placeholder='Login' value={currentNewLogin}/>
    <TextInput style={styles.text_input} onChangeText={handleCurrentNewMdpChange} placeholder='Mdp' value={currentNewMdp}/>
    
    {/* <Button onPress={registrate} title='Register'/> */}
    
    
    
    </View>
    )
}


export default Registration;
