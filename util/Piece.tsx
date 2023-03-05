import { useCallback } from "react";
import { Chess } from "chess.js";
import { Image, StyleSheet, Dimensions, } from "react-native";
import Animated, {
  useAnimatedGestureHandler, useAnimatedStyle,
  useSharedValue, withSpring
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { PlayerColor } from "../types/types";

type Type = "q" | "r" | "n" | "b" | "k" | "p";
type Piece = `${PlayerColor}${Type}`;
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

interface Position {
  x: number;
  y: number;
}

interface PieceProps {
  id: Piece;
  position: Position;
  movable: boolean;
  turn(color: PlayerColor, from: string, to: string): void;
  chess: Chess;
  color: PlayerColor;
}

export const Piece = ({ id, position, movable, turn, chess, color }: PieceProps) => {
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);

  /* 
    Translates the position of piece to Standard Algebraic Notation (SAN) for chess.js
    Example: Black rook x:0, y:0 => a8
  */
  const translatePositionToSquare = ({ x, y }: Position) => {
    const col = String.fromCharCode(97 + Math.round(x / (width / 8)));
    const row = 8 - Math.round(y / (width / 8));
    return `${col}${row}`;
  }

  /* 
    Translates piece from SAN to x,y position to get the new position on the board
    Example: Black rook moves to a6 => x:0, y:264
  */
  const translateSquareToPosition = (square: string): Position => {
    const [col, row] = square.split('');
    const position = {
      x: (col.charCodeAt(0) - 'a'.charCodeAt(0)) * width / 8,
      y: 7 * (width / 8) - (+row - 1) * width / 8
    }
    return position;
  }

  /*
    Move piece in chess.js engine and on board if valid and change turn
    If move is illegal piece springs back to starting position
  */
  const movePiece = useCallback((from: string, to: string) => {
    const move = chess.moves({ verbose: true }).find((m) => m.from === from && m.to === to);
    if (move) {
      chess.move({ from: from, to: to });
      turn(color, from, to);
      const position = translateSquareToPosition(to);
      offsetX.value = position.x;
      offsetY.value = position.y;
    } else {
      translateX.value = withSpring(offsetX.value);
      translateY.value = withSpring(offsetY.value);
    }
  }, [chess, offsetX, offsetY, translateX, translateY, turn]);

  // Move pieces with drag and drop
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
      const from = translatePositionToSquare({ x: offsetX.value, y: offsetY.value });
      const to = translatePositionToSquare({ x: translateX.value, y: translateY.value });
      movePiece(from, to)
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

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  piece: {
    width: width / 8,
    height: width / 8,
    position: 'absolute'
  }
});