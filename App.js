import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {  useState, useEffect, Label} from 'react';
import axios, {body} from 'axios';
import { NativeRouter, Route, Link, Switch, component, useHistory } from "react-router-native";
// import Registration from './Registration'

import { StyleSheet, Text, View, TextInput, FlatList, Button} from 'react-native';
import * as Location from "expo-location";
import Message from "./Message";
import Chat from "./Chat";


export default function App() {

  const geoApiRest = "https://api-adresse.data.gouv.fr/reverse/"
  const messApiRest = "https://api.dunarr.com"

  const [currentLogin, setCurrentLogin]= useState("")
  const [currentMdp, setCurrentMdp]= useState("")
  const [location, setLocation] = useState(null)
  const [token, setToken] = useState("")
  const [lat, setLat]=useState("")
  const [long, setLong]=useState("")
  const [currentCityCode, setCurrentCityCode]= useState(null)

  let history = useHistory()
 

  useEffect(async()=> {
    const { status } = await Location.requestPermissionsAsync()
    if(status !== "granted"){
      console.error("permission not granted")
    }
    const position = await Location.getCurrentPositionAsync()
    setLocation(position)
    setLat(position.coords.latitude)
    setLong(position.coords.longitude)
    
    // const lat = await position.coords.latitude,
    
 
  }, 
  [])

  function getCityCode() {
    axios.get(geoApiRest+"?lon="+long+"&lat="+lat
    )
    .then(response => {
      console.log(response)
      console.log(response.data)
      if (response.data.features.length === 0) {
        setCurrentCityCode(72002)
        console.log(currentCityCode)
      }
      else {
        setCurrentCityCode(response.data.features[0].properties.citycode)
        console.log(currentCityCode)
       }
        
      })
  }

  function handleCurrentLoginChange(text){
    setCurrentLogin(text)
  }

  function handleCurrentMdpChange(text){
    setCurrentMdp(text)
  }


  function login () {
    axios.post(messApiRest+"/api/login",
        {
          'username' : currentLogin,
          'password' : currentMdp,
        })
        .then(response => {
          console.log(response)
          setToken(response.data.token)
         console.log(token)
        getCityCode()
        // history.push("/message")
  }) 
  
  
}

function registration () {
  axios.post(messApiRest+"/api/register",
      {
        'username' : currentLogin,
        'password' : currentMdp,
      })
      .then(response => {
        console.log(response)

})
}



  

  return (<NativeRouter>
    <View style={styles.container}>
    <TextInput style={styles.text_input} onChangeText={handleCurrentLoginChange} placeholder='Login' value={currentLogin}/>
    <TextInput style={styles.text_input} onChangeText={handleCurrentMdpChange} placeholder='Mdp' value={currentMdp}/>
    
    <View style={styles.button}>
    <Button onPress={login} title='Login'/>
    <Button onPress={registration} title='Register'/>
    {/* <Button onPress={getCityCode} title='Code de la ville'/> */}
    </View>
    <Link
    to="/message">
      <Text>Envoyer un message</Text>
    </Link>
    <Link
    to="/chat">
      <Text>Afficher le dernier message envoyé</Text>
    </Link>
        <Switch>
            <Route path="/message" >
              <Message token={token} cityCode={currentCityCode}/>
            </Route>
            <Route exact path="/chat">
              <Chat token={token} cityCode={currentCityCode}></Chat>
            </Route>
          
        </Switch>
    
    </View>
    </NativeRouter>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  text: {
    marginTop: 10,
  },
  button: {
    // flex : 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-around"
  }
});

