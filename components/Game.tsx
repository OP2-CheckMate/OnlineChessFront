import { useState } from "react";
import Board from "./Board";
import { Chess } from "chess.js";
import { Image, View, StyleSheet, Dimensions } from "react-native";
import Animated from "react-native-reanimated";

type Player = "b" | "w";
type Type = "q" | "r" | "n" | "b" | "k" | "p";
type Piece = `${Player}${Type}`;
type Pieces = Record<Piece, ReturnType<typeof require>>;
export const PIECES: Pieces = {
  br: require("../assets/pieces/br.png"),
  bp: require("../assets/pieces/bp.png"),
  bn: require("../assets/pieces/bn.png"),
  bb: require("../assets/pieces/bb.png"),
  bq: require("../assets/pieces/bq.png"),
  bk: require("../assets/pieces/bk.png"),
  wr: require("../assets/pieces/wr.png"),
  wn: require("../assets/pieces/wn.png"),
  wb: require("../assets/pieces/wb.png"),
  wq: require("../assets/pieces/wq.png"),
  wk: require("../assets/pieces/wk.png"),
  wp: require("../assets/pieces/wp.png"),
};

interface PieceProps {
  id: Piece;
}

const Piece = ({ id }: PieceProps) => {
  return (
    <Animated.View>
      <Image source={PIECES[id]} style={styles.piece} />
    </Animated.View>
  )
}

export default function Game() {
  const chess = new Chess();
  const [player, setPlayer] = useState("w");
  const [board, setBoard] = useState(chess.board());

  console.log(chess.board())

  return (
    <View style={styles.container}>
      <Board />
      {board.map((row, y) =>
        row.map((piece, x) => {
          if (piece !== null) {
            return (
              <Piece
                id={`${piece.color}${piece.type}` as const}
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
  },
  piece: {
    width: width / 8,
    height: width / 8,
    position: 'absolute'
  }
});
