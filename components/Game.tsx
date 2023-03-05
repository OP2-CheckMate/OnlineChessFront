import { useState } from "react";
import Board from "../util/Board";
import { Chess } from "chess.js";
import { View, StyleSheet, Dimensions, Alert, Button } from "react-native";
import { Lobby } from "../types/types";
import { Player, PlayerColor } from "../types/types";
import { Piece } from "../util/Piece";
import { HOST_NAME } from '@env';


export default function Game({ route, navigation }: any) {
  const [game, setGame] = useState(new Chess());
  const [playerColor, setPlayerColor] = useState<PlayerColor>("w");
  const [board, setBoard] = useState(game.board());
  const lobby: Lobby = route.params.lobby
  const playerName: string = route.params.playerName;

  const fetchMoves = () => {
    fetch(`http://${HOST_NAME}:8080/api/games/lobby/${lobby.lobbyId}`)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }
  // Change active player and check if game is over
  const turn = (color: PlayerColor, from: string, to: string) => {
    console.log('lobbyId:', lobby)
    console.log('playerName:', playerName)
    setPlayerColor(game.turn());
    setBoard(game.board());
    let gameOver = game.isGameOver();
    console.log('gameOver', gameOver);

    const data = {
      recentMove: {
        from: from,
        to: to
      },
      gameOver: gameOver
    };

    fetch(`http://${HOST_NAME}:8080/api/games/lobby/${lobby.lobbyId}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))

    if (game.isGameOver()) {
      game.isCheckmate() ? (
        Alert.alert(playerColor === 'b' ? 'The winner is White' : `The winner is ${playerName}!`)
      ) : (
        Alert.alert('Draw!')
      )
    };
  };

  return (
    <View style={styles.container}>
      <Board />
      {board.map((row, y) =>
        row.map((piece, x) => {
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
              />
            );
          }
          return null;
        })
      )}
      <Button
        title="Refresh"
        onPress={fetchMoves}
      />
    </View>
  )
}

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width,
    height: width,
  }
});
