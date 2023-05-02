import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Move } from 'chess.js'

interface InfoTextProps {
  currentPlayer: string
  playerName: string
  lastPlayer: string
  inCheck: boolean
  move: Move | null
}

export const InfoText = ({
  currentPlayer,
  playerName,
  lastPlayer,
  inCheck,
  move,
}: InfoTextProps) => {
  return (
    <View style={styles.infoTextContainer}>
      <Text style={styles.InfoText}>
        {currentPlayer === playerName ? 'Your turn!' : `${currentPlayer}s turn`}
      </Text>
      <Text style={styles.InfoText}>
        {inCheck
          ? `${lastPlayer} has CHECKED the game!`
          : move
            ? `Last move: ${move.from} to ${move.to}`
            : 'No move made yet'}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  infoTextContainer: {
    flex: 0.08,
    flexDirection: 'row',
    paddingRight: 5,
    paddingLeft: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: '#2F351F',
    borderWidth: 1,
  },
  InfoText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
})
