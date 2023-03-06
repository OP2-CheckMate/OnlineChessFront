
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const Homepage = ({ navigation }: any) => {


  return (
    <>
      <View style={styles.container}>
        <ImageBackground source={require('./images/ChessGameFrontpagePic2.jpg')} resizeMode="cover" style={styles.image}>
          <View style={{flex: 2}}></View>
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
            <TouchableOpacity
              onPress={() => navigation.navigate('Game', {lobby: {lobbyId: 0, player1: 'p1'}, playerName: 'p1'})}
              style={styles.appButtonContainer}
            >
              <Text style={styles.appButtonText}>Board</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}></View>
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
    backgroundColor: "#8A7C4A",
    borderRadius: 10,
    borderColor: "rgb(1, 27, 10)",
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '55%'

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
    alignItems: 'center',
    justifyContent:'space-evenly',
    marginBottom: 50
  },

  image: {
    flex: 1,
    width: '100%'

  }
});

export default Homepage;
