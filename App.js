import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './app/navigation';

import AuthStack from './app/navigation/AuthStack';
import HomeScreen from './app/screens/HomeScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';


export default function App() {
  return (
        //  <HomeScreen/>
      // <AuthStack/>  
      <Routes/>

    // <WelcomeScreen/>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
