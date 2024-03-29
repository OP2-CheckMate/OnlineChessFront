import { Text, View, StyleSheet, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'
import { Themes } from './BoardThemes'
import { useIsFocused } from '@react-navigation/native'

interface RowProps {
  row: number;
}
interface SquareProps extends RowProps {
  col: number;
}
interface BoardProps {
  playerColor: 'b' | 'w';
  possibleMoveSquares: string[];
  bothPlayersOnBoard: boolean;
}

export default function Board({ playerColor, possibleMoveSquares, bothPlayersOnBoard }: BoardProps) {
  const [colorOne, setColorOne] = useState('')
  const [colorTwo, setColorTwo] = useState('')
  const [borderColor, setBorderColor] = useState('')
  const [showPossibleMoves, setShowPossibleMoves] = useState(true)
  /* forces a rerender when the user navigates to the screen (stack navigation doesn't rerender by default) */
  const isFocused = useIsFocused()

  useEffect(
    () => {
      getStoredOptions()
    },
    [AsyncStorage.getItem('theme'), AsyncStorage.getItem('showPossibleMoves')]
  )
  
  const getStoredOptions = async () => {
    try {
      // Retrieve theme
      const themeValue = await AsyncStorage.getItem('theme')
      if (themeValue !== null) {
        setColorOne(Themes[parseInt(themeValue)].col1)
        setColorTwo(Themes[parseInt(themeValue)].col2)
        setBorderColor(Themes[parseInt(themeValue)].borderCol)
      } else {
        setColorOne(Themes[0].col1)
        setColorTwo(Themes[0].col2)
        setBorderColor(Themes[0].borderCol)
      }
      // Retrieve gameplay settings
      const showPossibleMovesValue = await AsyncStorage.getItem('showPossibleMoves')
      if (showPossibleMovesValue !== null) {
        setShowPossibleMoves(JSON.parse(showPossibleMovesValue))
      }
    } catch (error) {
      console.log(error, 'Error while fetching stored options')
    }
  }


  const Row = ({ row }: RowProps) => {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {new Array(8).fill(0).map((_, col) => <Square row={row} col={col} key={col} />)}
      </View>
    )
  }

  const Square = ({ row, col }: SquareProps) => {
    /* we call getTheme() in the useEffect, so that the colors of the 
    board are updated whenever the player changes the theme */

    // Check for possible moves inside possible squares
    const squareName = `${String.fromCharCode('a'.charCodeAt(0) + col)}${8 - row}`
    const isPossibleMove = possibleMoveSquares.includes(squareName)

    const offset = row % 2 === 0 ? 1 : 0
    const backgroundColor = (col + offset) % 2 === 0 ? colorTwo : colorOne
    const color = (col + offset) % 2 === 0 ? colorOne : colorTwo
    // Highlighted borders for possible moves
    const highLightedBorderColor = bothPlayersOnBoard && isPossibleMove && showPossibleMoves ? borderColor : 'transparent'
    

    return (
      <View style={{
        flex: 1,
        backgroundColor: backgroundColor,
        padding: 5,
        borderWidth: 3,
        borderColor: highLightedBorderColor,
        transform: [
          { rotateX: playerColor === 'b' ? '180deg' : '0deg' },
          { rotateY: playerColor === 'b' ? '180deg' : '0deg' }
        ],


      }}>
        {playerColor === 'w'
          ? <View style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Text style={{ flex: 1, color: color, opacity: col === 0 ? 1 : 0 }}>{8 - row}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ flex: 1, color: color, opacity: row === 7 ? 1 : 0 }}>
                {String.fromCharCode('a'.charCodeAt(0) + col)}
              </Text>
            </View>
          </View>
          : <View style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Text style={{ flex: 1, color: color, opacity: row === 7 ? 1 : 0 }}>
                {String.fromCharCode('a'.charCodeAt(0) + col)}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ flex: 1, color: color, opacity: col === 0 ? 1 : 0 }}>{8 - row}</Text>
            </View>
          </View>}

      </View>
    )
  }
  return <View style={styles.container}>{new Array(8).fill(0).map((_, row) => <Row row={row} key={row} />)}</View>
}
const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    width,
    height: width
  }
})
