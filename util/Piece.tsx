import React, { useCallback } from 'react'
import { Chess, Square } from 'chess.js'
import { Image, StyleSheet, Dimensions } from 'react-native'
import Animated, {
  runOnJS,
  useAnimatedGestureHandler, useAnimatedStyle,
  useSharedValue, withSpring
} from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { PlayerColor } from '../types/types'
import PromotionModalComponent from './PromotionModal'

type Type = 'q' | 'r' | 'n' | 'b' | 'k' | 'p';
type Piece = `${PlayerColor}${Type}`;
type Pieces = Record<Piece, ReturnType<typeof require>>;
export const PIECES: Pieces = {
  br: require('../assets/pieces/br.png'),
  bp: require('../assets/pieces/bp.png'),
  bn: require('../assets/pieces/bn.png'),
  bb: require('../assets/pieces/bb.png'),
  bq: require('../assets/pieces/bq.png'),
  bk: require('../assets/pieces/bk.png'),
  wr: require('../assets/pieces/wr.png'),
  wn: require('../assets/pieces/wn.png'),
  wb: require('../assets/pieces/wb.png'),
  wq: require('../assets/pieces/wq.png'),
  wk: require('../assets/pieces/wk.png'),
  wp: require('../assets/pieces/wp.png'),
}

interface Position {
  x: number;
  y: number;
}

interface PieceProps {
  id: Piece;
  position: Position;
  movable: boolean;
  turn(color: PlayerColor, from: string, to: string, promotion?: string): void;
  chess: Chess;
  color: PlayerColor;
  playerColor?: PlayerColor,
  bothPlayersOnBoard: boolean;
  setShowPossibleMoves: (moves: string[]) => void;
}

export const Piece = ({ id, position, movable, turn, chess, color, playerColor, bothPlayersOnBoard, setShowPossibleMoves }: PieceProps) => {
  const offsetX = useSharedValue(0)
  const offsetY = useSharedValue(0)
  const translateX = useSharedValue(position.x)
  const translateY = useSharedValue(position.y)

  const [promoSelectionVisible, setPromoSelectionVisible] = React.useState(false)
  const [selectedPromoPiece, setSelectedPromoPiece] = React.useState('')
  const [selectedPromotion, setSelectedPromotion] = React.useState({
    from: '', to: '',
  })

  const handleModalClose = (piece: string) => {
    setPromoSelectionVisible(false)
    handlePromotionSelection(selectedPromotion.from, selectedPromotion.to, piece)
  }

  //Async function to get chosen promotion from Modal
  const getValueFromModal = async() => {
    setPromoSelectionVisible(true)
    return new Promise<string>((resolve) => {
      setSelectedPromoPiece('')
      const intervalId = setInterval(() => {
        if (selectedPromoPiece) {
          clearInterval(intervalId)
          resolve(selectedPromoPiece)
        }
      }, 100)
    })
  }

  const handleGetValue = async (from: string, to: string) => {
    const value = await getValueFromModal()
    handleModalClose(value)
  }


  /* 
    Translates the position of piece to Standard Algebraic Notation (SAN) for chess.js
    Example: Black rook x:0, y:0 => a8
  */
  const translatePositionToSquare = ({ x, y }: Position) => {
    const col = String.fromCharCode(97 + Math.round(x / (width / 8)))
    const row = 8 - Math.round(y / (width / 8))
    return `${col}${row}`
  }

  /* 
    Translates piece from SAN to x,y position to get the new position on the board
    Example: Black rook moves to a6 => x:0, y:264
  */
  const translateSquareToPosition = (square: string): Position => {
    const [col, row] = square.split('')
    const position = {
      x: (col.charCodeAt(0) - 'a'.charCodeAt(0)) * width / 8,
      y: 7 * (width / 8) - (+row - 1) * width / 8
    }
    return position
  }

  /*
    Move piece in chess.js engine and on board if valid and change turn
    If move is illegal piece springs back to starting position
  */
  const movePiece = useCallback((from: string, to: string) => {
    const move = chess.moves({ verbose: true }).find((m) => m.from === from && m.to === to)
    const promotions = chess.moves({ verbose: true }).filter(m => m.promotion)
    if (bothPlayersOnBoard && move && move.promotion === undefined) {
      chess.move({ from: from, to: to, promotion: undefined })
      turn(color, from, to)
      const position = translateSquareToPosition(to)
      offsetX.value = position.x
      offsetY.value = position.y
    } else if (promotions.some(p => p.to === to)) {
      setSelectedPromotion({from: from, to: to})
      handleGetValue(from, to)
    } else {
      translateX.value = withSpring(offsetX.value)
      translateY.value = withSpring(offsetY.value)
    }
  }, [chess, offsetX, offsetY, translateX, translateY, turn, bothPlayersOnBoard])

  //Is called when player has chosen what piece he wants to promote to. Same as MovePiece except promotion-value.
  const handlePromotionSelection = useCallback((from: string, to: string, promotion: string) => {
    chess.move({ from: from, to: to, promotion: promotion })
    turn(color, from, to, promotion)
    const position = translateSquareToPosition(to)
    offsetX.value = position.x
    offsetY.value = position.y
  }, [chess, color, offsetX, offsetY, selectedPromotion, turn])

  /*
  const getTranslateValue = (translation: number, offset: number) => {
    if (color === 'b') {
      return offset - translation
    } else {
      return translation + offset
    }
  }
  */
  
  //RUNJS
  const wrapper = (from: Position, to: Position) => {
    const fromPos = translatePositionToSquare(from)
    const toPos = translatePositionToSquare(to)
    movePiece(fromPos, toPos)
    setShowPossibleMoves([])
  }
  // RUNJS WRAPPER TO SET POSSIBLE MOVES WHILE DRAGGING A PIECE
  const wrapper69 = (from: Position) => {
    const fromPos = translatePositionToSquare(from) as Square
    const possibleMoves = chess.moves({ square: fromPos })
    // remove extra characters 
    const withoutExtraCharacter = possibleMoves.map(move => {
      return move.endsWith('+') ? move.slice(-3, -1) : move.slice(-2)
    })
    setShowPossibleMoves(withoutExtraCharacter)
  }

  // Move pieces with drag and drop
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      offsetX.value = translateX.value
      offsetY.value = translateY.value
      runOnJS(wrapper69)({ x: offsetX.value, y: offsetY.value })
    },
    onActive: ({ translationX, translationY }) => {
      //ENABLED WHEN BLACK PLAYS
      if (color === 'b') {
        translateX.value = offsetX.value - translationX //getTranslateValue(translationX, offsetX.value)
        translateY.value = offsetY.value - translationY//getTranslateValue(translationY, offsetY.value)
      } else {
        translateX.value = translationX + offsetX.value
        translateY.value = translationY + offsetY.value
      }

    },
    onEnd: () => {
      runOnJS(wrapper)({ x: offsetX.value, y: offsetY.value }, { x: translateX.value, y: translateY.value })
      //const from = translatePositionToSquare({ x: offsetX.value, y: offsetY.value });
      //const to = runOnJS(wrapper)();
      //movePiece(from, to)
    }
  })

  //TRANSFORM ROTATION ONLY WHEN BLACK PLAYS
  const piece = useAnimatedStyle(() => ({
    position: 'absolute',
    width: (width / 8),
    height: (width / 8),
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotateX: playerColor === 'b' ? '180deg' : '0deg' },
      { rotateY: playerColor === 'b' ? '180deg' : '0deg' }
    ],
  }))

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent} enabled={movable}>
      <Animated.View style={piece}>
        <PromotionModalComponent isVisible={promoSelectionVisible} onClose={handleModalClose} />
        <Image source={PIECES[id]} style={styles.piece} />
      </Animated.View>
    </PanGestureHandler>
  )
}

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  piece: {
    width: width / 8,
    height: width / 8,
    position: 'absolute'
  }
})