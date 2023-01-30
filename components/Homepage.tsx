import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Homepage= ({ //navigation
 }) => {
  const [playerCount, setPlayerCount] = useState(1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Chess Game!</Text>
      <View style={styles.playerCountContainer}>
        <Text style={styles.playerCountText}>Players: {playerCount}</Text>
        <Button
          title="+"
          onPress={() => setPlayerCount(playerCount + 1)}
        />
      </View>
      <Button
        title="Start Game"
        //onPress={() => navigation.navigate('Game')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  playerCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  playerCountText: {
    fontSize: 18,
    marginRight: 10,
  },
});

export default Homepage;
