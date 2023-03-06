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
  const [recentMove, setRecentMove] = useState<any>({})
  const [board, setBoard] = useState(game.board());
  const lobby: Lobby = route.params.lobby
  const playerName: string = route.params.playerName;

  //Gets player color based on assignment player1 or player2
  const getPlayerColor = () => {
    if(lobby.player1.name === playerName) return 'w'
    else return 'b'
  }
  const [playerColor, setPlayerColor] = useState<PlayerColor>(getPlayerColor());

  //Refreshes moves made by the opponent and if changes are made update board
  const fetchMoves = () => {
    fetch(`http://${HOST_NAME}:8080/api/games/lobby/${lobby.lobbyId}`)
      .then(res => res.json())
      .then(data => {
        if (data.recentMove.from !== recentMove.from && data.recentMove.to !== recentMove.to){
          //OPPONENT MADE A MOVE AND NEEDS TO BE REFRESHED
          game.move({from: data.recentMove.from, to: data.recentMove.to})
          setBoard(game.board())
          checkGameOverStatus(game, false)
        }
      })
      .catch(err => console.log(err))
  }

  // Change active player and check if game is over
  const turn = (color: PlayerColor, from: string, to: string) => {
    setBoard(game.board());
    let gameOver = game.isGameOver();
    const movedPiece = {from: from, to: to}
    setRecentMove(movedPiece)
    const data = {
      recentMove: movedPiece,
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
      .then(data => console.log(/*data*/))//Probably can be removed unless we validate return status
      .catch(err => console.log(err))

    checkGameOverStatus(game, true)
  };

  const checkGameOverStatus = (match: any, ownMove: boolean) => {
    if (match.isGameOver()) {
      match.isCheckmate() ? (
        Alert.alert(ownMove ? 'You Win! :)' : 'You Lost! >:D')
      ) : (
        Alert.alert('Draw!')
      )
    };
  }

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
