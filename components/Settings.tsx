import React from 'react'
import { Text, View, ImageBackground, StyleSheet } from 'react-native'

const Settings = () => {
  return (
    <View style={styles.container}>
    <ImageBackground source={require('./images/settingsBgImage.png')} resizeMode="cover" style={styles.image}>
      <Text style={styles.text}>Theme</Text>
    </ImageBackground>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});

export default Settings