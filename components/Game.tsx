import React, { FC, useLayoutEffect, useState } from 'react'
import Board from '../util/Board'
import { Chess, Move } from 'chess.js'
import { View, StyleSheet, Dimensions, Button, Text } from 'react-native'
import { GameNavigationProp, GameRouteProp, Lobby } from '../types/types'
import { PlayerColor } from '../types/types'
import { Piece } from '../util/Piece'
import {
  CheckmateModal,
  StalemateModal,
  DrawModal,
} from '../util/GameOverModal'
import Ionicons from '@expo/vector-icons/Ionicons'
import socket from '../socket/socket'
import { useEffect } from 'react'
import { Snackbar } from '@react-native-material/core'
import ChatBox from '../util/ChatBox'

type Props = {
  navigation: GameNavigationProp
  route: GameRouteProp
}

const Game: FC<Props> = ({ route, navigation }) => {
  const [game, setGame] = useState(new Chess())
  const [board, setBoard] = useState(game.board())
  const { lobby, playerName } = route.params
  const [winner, setWinner] = useState('')
  const [currentPlayer, setCurrentPlayer] = useState(lobby.player1.name)
  const [lastPlayer, setLastPlayer] = useState('')
  const [cModalVisible, setCModalVisible] = useState(false)
  const [sModalVisible, setSModalVisible] = useState(false)
  const [dModalVisible, setDModalVisible] = useState(false)
  const [move, setMove] = useState<Move | null>(null) //null only before game starts
  const [messages, setMessages] = useState<string[]>([])

  /* Hook to change header options in Game screen, used to navigate to settings page. 
  Settings-Icon in top right corner of the page. */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Ionicons
            name='settings'
            size={30}
            color='black'
            onPress={() => {
              navigation.navigate('Settings')
            }}
          />
        )
      },
    })
  }, [navigation])

  // Gets player color based on assignment player1 or player2. w=White, b=Black.
  const getPlayerColor = (): PlayerColor => {
    return lobby.player1.name === playerName ? 'w' : 'b'
  }
  const [playerColor, setPlayerColor] = useState<PlayerColor>(getPlayerColor())

  //State of the game was updated (opponent moved a piece)
  socket.on('gameUpdate', (movedPiece: Move) => {
    setMove(movedPiece)
  })
  useEffect(() => {
    if (move !== null) {
      console.log('opponent moved: ', move)
      game.move(move)
      setBoard(game.board())
      checkCurrentPlayer(game.turn())
      checkGameOverStatus(game)
      updateCheckStatus(game)
    }
  }, [move])

  // Checks the name of the player whose turn it is
  const checkCurrentPlayer = (turn: PlayerColor) => {
    const currentPlayerName =
      turn === 'b' ? lobby.player2!.name : lobby.player1.name
    if (currentPlayer !== currentPlayerName) {
      setLastPlayer(currentPlayer)
      setCurrentPlayer(currentPlayerName)
    }
  }

  // Check for check
  const [inCheck, setInCheck] = useState(false)
  const updateCheckStatus = (match: Chess) => {
    setInCheck(match.inCheck())
  }

  const getOpponentId = () => {
    return getPlayerColor() === 'w' ? lobby.player2?.id : lobby.player1.id
  }

  // Change active player, send move to backend and check if game is over
  const turn = (color: PlayerColor, from: string, to: string) => {
    setBoard(game.board())
    socket.emit('updateGame', { from, to }, getOpponentId())
    checkGameOverStatus(game)
    updateCheckStatus(game)
    checkCurrentPlayer(game.turn())
  }

  // Checks which player won based on current turn
  const checkWinner = (turn: PlayerColor) => {
    turn === 'b'
      ? setWinner(lobby.player1.name)
      : setWinner(lobby.player2!.name)
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

  const handleSendMessage = (message: string) => {
    setMessages([...messages, message])
  }

  // Change scale x, y based on color, BLACK -> -1. This is to flip the board for black player.
  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            transform: [
              { scaleX: playerColor === 'b' ? -1 : 1 },
              { scaleY: playerColor === 'b' ? -1 : 1 },
            ],
          }}
        >
          <Board playerColor={playerColor} />
          {board.map((row, y) =>
            row.map((piece, x) => {
              {
                /* Go through all rows and place pieces to squares */
              }
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
        {/* <Button title="Refresh" onPress={fetchMoves} /> */}

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
      <View style={styles.container}>
        <Text>{`Now in turn: ${currentPlayer}`}</Text>
        {inCheck ? (
          <Snackbar
            message={`${lastPlayer} has checked the game `}
            style={{ position: 'absolute', start: 30, end: 30, bottom: 100 }}
          />
        ) : (
          <></>
        )}
        <ChatBox
          onSendMessage={handleSendMessage}
          messages={messages}
        ></ChatBox>
      </View>
    </>
  )
}

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    width,
    height: width,
  },
})

export default Game