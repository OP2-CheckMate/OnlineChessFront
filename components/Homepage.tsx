
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const Homepage = ({ navigation }: any) => {


  return (
    <>
      <View style={styles.container}>
        <ImageBackground source={require('./images/ChessGameFrontpagePic2.jpg')} resizeMode="cover" style={styles.image}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Settings')}
              style={styles.appButtonContainer}
            >
              <Text style={styles.appButtonText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('QueuingScreen')}
              style={styles.appButtonContainer}
            >
              <Text style={styles.appButtonText}>Start Game</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  appButtonContainer: {
    elevation: 8,
    backgroundColor: "rgb(1, 27, 10)",
    borderRadius: 10,
    borderColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '45%'

  },
  appButtonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    marginBottom: 50
  },

  image: {
    flex: 1,
    width: '100%'

  }
});

export default Homepage;
