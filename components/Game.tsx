import { SetStateAction, useCallback, useState } from "react";
import Board from "./Board";
import { Chess } from "chess.js";
import { Image, View, StyleSheet, Dimensions } from "react-native";
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

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
  position: {
    x: number,
    y: number
  };
  movable: boolean;
  turn(color: Player): void; //added variable
  chess: Chess;
  color: Player; //added color
}

const Piece = ({ id, position, movable, turn, chess, color }: PieceProps) => {
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);
  // const movePiece = useCallback(() => {
  //   turn(player);
  // }, [chess, turn])

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      offsetX.value = translateX.value;
      offsetY.value = translateY.value;
    },
    onActive: ({ translationX, translationY }) => {
      translateX.value = translationX + offsetX.value;
      translateY.value = translationY + offsetY.value;
    },
    onEnd: () => {
      translateX.value = withSpring(position.x);
      translateY.value = withSpring(position.y);
      turn(color);
    }
  })

  const piece = useAnimatedStyle(() => ({
    position: "absolute",
    width: (width / 8),
    height: (width / 8),
    transform: [{ translateX: translateX.value }, { translateY: translateY.value },],
  }));

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent} enabled={movable}>
      <Animated.View style={piece}>
        <Image source={PIECES[id]} style={styles.piece} />
      </Animated.View>
    </PanGestureHandler>
  )
}


export default function Game() {
  const chess = new Chess();
  const [player, setPlayer] = useState<Player>("w");
  const [board, setBoard] = useState(chess.board());

  const turn = (color: Player) => { //color variable
    console.log(color) //print color
    setPlayer(color === "w" ? "b" : "w");
    setBoard(chess.board())
  }

  return (
    <View style={styles.container}>
      <Board />
      {board.map((row, y) =>
        row.map((piece, x) => {
          if (piece !== null) {
            return (
              <Piece
                id={`${piece.color}${piece.type}` as const}
                position={{ x: x * (width / 8), y: y * (width / 8) }}
                movable={player === piece.color}
                chess={chess}
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
  },
  piece: {
    width: width / 8,
    height: width / 8,
    position: 'absolute'
  }
});
