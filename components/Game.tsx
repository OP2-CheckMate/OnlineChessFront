import React, { FC, useLayoutEffect, useState } from 'react'
import Board from '../util/Board'
import { Chess, Move } from 'chess.js'
import { View, StyleSheet, Dimensions, BackHandler, Alert } from 'react-native'
import { GameNavigationProp, GameRouteProp } from '../types/types'
import { PlayerColor } from '../types/types'
import { Piece } from '../util/Piece'
import { InfoText } from '../util/IngameInfoText'
import {
  CheckmateModal,
  StalemateModal,
  DrawModal,
} from '../util/GameOverModal'
import Ionicons from '@expo/vector-icons/Ionicons'
import socket from '../socket/socket'
import { useEffect } from 'react'
import ChatBox from '../util/ChatBox'
import { WaitingForBothPlayersLoadingView } from '../util/WaitingForBothPlayersLoadingScreen'
import { OpponentLeftModal } from '../util/OpponentLeftModal'
import { LeaveGameAlert } from '../util/LeaveGameAlert'


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
  const [possibleMoveSquares, setPossibleMoveSquares] = useState<string[]>([])
  const [bothPlayersOnBoard, setBothPlayersOnBoard] = useState(false)
  const [opponentDisconnected, setOpponentDisconnected] = useState(false)
  const [opponentLeftGame, setOpponentLeftGame] = useState(false)

   // Used when the user presses the back button on the device or the back button in the header
   const onBackPress = () => {
    const { showAlert } = LeaveGameAlert({
      onConfirm: () => {
        socket.emit('playerExited', getPlayerId());
        setOpponentLeftGame(true);
        navigation.navigate('Homepage');
      },
    });
    showAlert();
  };
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
      headerLeft: () => (
        <Ionicons
          name="arrow-back"
          size={30}
          color="black"
          onPress={() => onBackPress()}
          style={{ marginLeft: 10 }}
        />
      ),
    })
  }, [navigation])

   // Handle the (hardware) back button press
   useEffect(() => {
    const handleBackPress = () => {
      LeaveGameAlert({
        onConfirm: () => {
         onBackPress();
        },
      });
      // Return true to prevent the default behavior (closing the app)
      return true;
    };
    // Add the listener to the BackHandler
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    // Clean up the listener when the component is unmounted
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  // Handle the socket events
    useEffect(() => {
      // Listen for the 'boardsOpen' event from the server
      const onBothBoardsOpen = () => {
        setBothPlayersOnBoard(true);
      };
      // Handle the opponent's disconnection
      const onOpponentDisconnected = () => {
        setOpponentDisconnected(true);
      };
      // Handle the opponent leaving by closing the game
      const onOpponentExited = () => {
        setOpponentLeftGame(true);
      };
      // Add the listeners
      socket.on('bothBoardsOpen', onBothBoardsOpen);
      socket.on('opponentDisconnected', onOpponentDisconnected);
      socket.on('opponentExited', onOpponentExited);
      // Clean up the listeners when the component is unmounted
      return () => {
        socket.off('bothBoardsOpen', onBothBoardsOpen);
        socket.off('opponentDisconnected', onOpponentDisconnected);
        socket.off('opponentExited', onOpponentExited);
      };
    }, [socket]);
    

  // Gets player color based on assignment player1 or player2. w=White, b=Black.
  const getPlayerColor = (): PlayerColor => {
    return lobby.player1.name === playerName ? 'w' : 'b'
  }
  const [playerColor, setPlayerColor] = useState<PlayerColor>(getPlayerColor())

  const getPlayerId = (): string => {
    return lobby.player1.name === playerName ? lobby.player1.id : lobby.player2!.id
  }

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
  const turn = (color: PlayerColor, from: string, to: string, promotion?: string) => {

    setBoard(game.board())
    socket.emit('updateGame', { from, to, promotion }, getOpponentId())
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
          <Board
            playerColor={playerColor}
            possibleMoveSquares={possibleMoveSquares}
            bothPlayersOnBoard={bothPlayersOnBoard}
          />
          {board.map((row, y) =>
            row.map((piece, x) => {
              {
                /* Go through all rows and place pieces to squares */
              }
              if (bothPlayersOnBoard && piece !== null) {
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
                    bothPlayersOnBoard={bothPlayersOnBoard}
                    setShowPossibleMoves={setPossibleMoveSquares}
                  />
                )
              }
              return null
            })
          )}
        </View>
        {!bothPlayersOnBoard && (
         <WaitingForBothPlayersLoadingView opponentDisconnected={opponentDisconnected} />
         )}

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
        <OpponentLeftModal
          opponentDisconnected={opponentDisconnected}
          opponentLeft={opponentLeftGame}
          modalVisible={opponentDisconnected || opponentLeftGame}
          toggleModal={() => setDModalVisible(!dModalVisible)}
          navigation={() => navigation.navigate('Homepage')}
        />
      </View>
      <View style={styles.container}>
        <InfoText
          currentPlayer={currentPlayer}
          playerName={playerName}
          lastPlayer={lastPlayer}
          inCheck={inCheck}
          move={move}
        />
        {/*<Text>ready={bothPlayersOnBoard ? "yes" : "no"}</Text>*/}
        <ChatBox lobbyId={lobby.lobbyId} playerId={getPlayerId()}></ChatBox>
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
