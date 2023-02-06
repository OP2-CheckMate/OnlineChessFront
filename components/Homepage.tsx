
import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const Homepage = ({ navigation } : any) => {


  return (
    <>
      <View style={styles.container}>
        <ImageBackground source={require('./images/ChessGameFrontpagePic.png')} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>Welcome to Chess Game!</Text>
        </ImageBackground>
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('QueuingScreen')}
        style={styles.appButtonContainer}
      >
      <Text style={styles.appButtonText}>Start Game</Text>
      </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(1, 27, 10)'
    
    
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "rgb(1, 27, 10)",
    borderRadius: 50,
    borderColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 12,
    
  },
  appButtonText: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    flex: 1,
    width: '100%'
    
  }
});

export default Homepage;
