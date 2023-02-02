import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

const Homepage = ({ navigation } : any) => {


  return (
    <>
      <View style={styles.container}>
        <Image source={require('./images/ChessGameFrontpagePic.png')} />
        <Text style={styles.title}>Welcome to Chess Game!</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Start Game"
          onPress={() => navigation.navigate('QueuingScreen')}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

});

export default Homepage;
