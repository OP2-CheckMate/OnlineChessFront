import { useState } from "react";
import Board from "../util/Board";
import { Chess } from "chess.js";
import { Image, View, StyleSheet, Dimensions } from "react-native";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Lobby } from "../types/types";

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

interface Position {
  x: number;
  y: number;
}

interface PieceProps {
  id: Piece;
  position: Position;
  movable: boolean;
  turn(color: Player): void;
  chess: Chess;
  color: Player;
}

const Piece = ({ id, position, movable, turn, chess, color }: PieceProps) => {
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
    TODO: FOR SOME REASON TRYING TO MOVE A PIECE SECOND TIME RESETS THE BOARD AND DOES NOT WORK
  */
  const movePiece = (from: any, to: string) => {
    console.log('from:', from)
    console.log('to:', to)
    console.log('valid  moves', chess.moves({ verbose: true }))
    console.log('board', chess.board())
    const move = chess.moves({ verbose: true }).find((m) => m.from === from && m.to === to);
    // console.log(move)
    if (move) {
      chess.move({ from: from, to: to });
      turn(color);
      const position = translateSquareToPosition(to);
      translateX.value = position.x;
      translateY.value = position.y;
    } else {
      translateX.value = withSpring(offsetX.value);
      translateY.value = withSpring(offsetY.value);
    }
  }

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
      movePiece(from, to);
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


export default function Game({ route, navigation }: any) {
  const chess = new Chess();
  const [player, setPlayer] = useState<Player>("w");
  const [board, setBoard] = useState(chess.board());
  // const lobby: Lobby = route.params.lobby
  // const playerName: string = route.params.playerName

  // Change active player
  const turn = (color: Player) => {
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
