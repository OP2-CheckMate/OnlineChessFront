import { useState } from "react";
import Board from "../util/Board";
import { Chess } from "chess.js";
import { View, StyleSheet, Dimensions, Alert } from "react-native";
import { Lobby } from "../types/types";
import { Player, PlayerColor } from "../types/types";
import { Piece } from "../util/Piece";


export default function Game({ route, navigation }: any) {
  const [game, setGame] = useState(new Chess());
  const [player, setPlayer] = useState<PlayerColor>("w");
  const [board, setBoard] = useState(game.board());
  // const lobby: Lobby = route.params.lobby
  // const playerName: string = route.params.playerName;

  // Change active player and check if game is over
  const turn = () => {
    setPlayer(game.turn());
    setBoard(game.board());
    if (game.isGameOver()) {
      game.isCheckmate() ? (
        Alert.alert(player === 'b' ? 'The winner is White' : 'The winner is Black!')
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
                movable={player === piece.color}
                chess={game}
                turn={turn}
                color={piece.color}
              />
            );
          }
          return null;
        })
      )}
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
