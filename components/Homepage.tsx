
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const Homepage = ({ navigation }: any) => {

  return (
    <>
      <View style={styles.container}>
        <ImageBackground source={require('./images/ChessGameFrontpagePic2.jpg')} resizeMode="cover" style={styles.image}>
          <View style={styles.buttonContainer}>
          <TouchableOpacity
              onPress={() => navigation.navigate('QueuingScreen')}
              style={styles.appButton}
            >
              <Text style={styles.appButtonText}>Start Game</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Settings')}
              style={styles.appButton}
            >
              <Text style={styles.appButtonText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Game', {lobby: {lobbyId: 0, player1: 'p1'}, playerName: 'p1'})}
              style={styles.appButton}
            >
              <Text style={styles.appButtonText}>Board</Text>
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

  appButton: {
    backgroundColor: "rgba(138,124,74, 0.88)",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '55%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(170, 170, 170, 0.5)',
    shadowColor: 'white',
    shadowOpacity: 1,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 10,
    elevation: 40,

  },
  appButtonText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    marginTop: 200,
  },

  image: {
    flex: 1,
    width: '100%'

  }
});

export default Homepage;
