import React, { useLayoutEffect, useState } from 'react'
import Board from '../util/Board'
import { Chess } from 'chess.js'
import { View, StyleSheet, Dimensions, Button } from 'react-native'
import { GameNavigationProp, GameRouteProp } from '../types/types'
import { PlayerColor } from '../types/types'
import { Piece } from '../util/Piece'
import { HOST_NAME } from '@env'
import { CheckmateModal, StalemateModal, DrawModal } from '../util/GameOverModal'
import Ionicons from '@expo/vector-icons/Ionicons'

type Props = {
  navigation: GameNavigationProp,
  route: GameRouteProp
}

export default function Game({ route, navigation }: Props) {
  const playerName = route.params.playerName
  const [game, setGame] = useState(new Chess())
  const [board, setBoard] = useState(game.board())
  const [lobby, setLobby] = useState(route.params.lobby)
  const [winner, setWinner] = useState('')
  const [cModalVisible, setCModalVisible] = useState(false)
  const [sModalVisible, setSModalVisible] = useState(false)
  const [dModalVisible, setDModalVisible] = useState(false)

  /* Hook to change header options in Game screen, used to navigate to settings page. 
  Settings-Icon in top right corner of the page. */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Ionicons name="settings" size={30} color="black" onPress={() => { navigation.navigate('Settings') }} />
      }
    })
  }, [navigation])

  // Gets player color based on assignment player1 or player2. w=White, b=Black.
  const getPlayerColor = (): PlayerColor => {
    return lobby.player1.name === playerName ? 'w' : 'b'
  }
  const [playerColor, setPlayerColor] = useState<PlayerColor>(getPlayerColor())

  // Refreshes moves made by the opponent and if changes are made update board
  const fetchMoves = () => {
    fetch(`http://${HOST_NAME}:8080/api/games/lobby/${lobby.lobbyId}`)
      .then(res => res.json())
      .then(data => {
        //OPPONENT MADE A MOVE AND NEEDS TO BE REFRESHED
        game.move({ from: data.recentMove.from, to: data.recentMove.to })
        setBoard(game.board())
        checkGameOverStatus(game)
      })
      .catch(err => console.log(err))
  }

  // Change active player, send move to backend and check if game is over
  const turn = (color: PlayerColor, from: string, to: string) => {
    setBoard(game.board())
    const gameOver = game.isGameOver()
    const movedPiece = { from: from, to: to }
    const data = {
      recentMove: movedPiece,
      gameOver: gameOver
    }
    fetch(`http://${HOST_NAME}:8080/api/games/lobby/${lobby.lobbyId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => setLobby(data))
      .catch(err => console.log(err))
    checkGameOverStatus(game)
  }

  // Checks which player won based on current turn
  const checkWinner = (turn: PlayerColor) => {
    turn === 'b' ? setWinner(lobby.player1.name) : setWinner(lobby.player2!.name)
  }

  // Checks if game is over and return modal based on which way it ended (currently checkmate, stalemate and draw)
  const checkGameOverStatus = (match: Chess) => {
    if (match.isGameOver()) {
      checkWinner(match.turn())
      if (match.isCheckmate()) {
        setCModalVisible(!cModalVisible)
      } else if (match.isStalemate()) {
        setSModalVisible(!sModalVisible)
      } else if (match.isDraw()) {
        setDModalVisible(!dModalVisible)
      }
    }
  }

  // Change scale x, y based on color, BLACK -> -1. This is to flip the board for black player.
  return (
    <View style={styles.container}>
      <View style={{ transform: [{ scaleX: playerColor === 'b' ? -1 : 1 }, { scaleY: playerColor === 'b' ? -1 : 1 }] }}>
        <Board playerColor={playerColor} />
        {board.map((row, y) =>
          row.map((piece, x) => {
            {/* Go through all rows and place pieces to squares */ }
            if (piece !== null) {
              return (
                <Piece
                  key={`${y}-${x}`}
                  id={`${piece.color}${piece.type}` as const}
                  position={{ x: x * (width / 8), y: y * (width / 8) }}
                  movable={playerColor === piece.color}
                  chess={game}
                  turn={turn}
                  color={piece.color}
                  playerColor={playerColor}
                />
              )
            }
            return null
          })
        )}
      </View>
      <Button title="Refresh" onPress={fetchMoves} />

      {/* one of the following modals will be displayed based on how the game ended */}
      <CheckmateModal
        modalVisible={cModalVisible}
        toggleModal={() => setCModalVisible(!cModalVisible)}
        navigation={() => navigation.navigate('Homepage')}
        name={winner}
      />
      <StalemateModal
        modalVisible={sModalVisible}
        toggleModal={() => setSModalVisible(!sModalVisible)}
        navigation={() => navigation.navigate('Homepage')}
      />
      <DrawModal
        modalVisible={dModalVisible}
        toggleModal={() => setDModalVisible(!dModalVisible)}
        navigation={() => navigation.navigate('Homepage')}
      />
    </View>
  )
}

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    width,
    height: width,
  }
})
