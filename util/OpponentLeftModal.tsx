import React, { useEffect, useRef, useState } from 'react'
import { Modal, View, Text, StyleSheet } from 'react-native'
import CustomButton from './CustomButton'
import socket from '../socket/socket'
import { Lobby } from '../types/types';

interface ModalProps {
    opponentDisconnected: boolean;
    opponentLeft: boolean;
    modalVisible: boolean;
    toggleModal: () => void;
    navigation: () => void;
    lobbyId: number;
    printData: (a: any) => void;
    board: any
    currentPlayer: string;
    lobby: Lobby;
}


export const OpponentLeftModal: React.FC<ModalProps> = ({ opponentDisconnected, opponentLeft, modalVisible, toggleModal, navigation, lobbyId, printData, board, currentPlayer, lobby }) => {

  const reason = opponentDisconnected ? 'disconnected' : 'left'
  const [timer, setTimer] = useState(60)
  const [request, setRequest] = useState(true)
  const [boardData, setBoardData] = useState(board)
  const [opponentId, setOpponentId] = useState<String>() 

  useEffect(()=>{
    if(opponentDisconnected){
      setTimeout(() => {
        setTimer(timer -1)
      }, 1000)
    }
  }, [timer, opponentDisconnected])

  const closeGame = () => {
    socket.emit('gameOver', lobbyId)
    navigation()
  }
  useEffect(() => {
    sendBoardData()
  }, [opponentId])

  socket.on('reconnectRequest', (opponentId: string) => {
    setOpponentId(opponentId)
  })

  //Send current board data back to opponent
  const sendBoardData = () => {
    //printData(boardThing)
    console.log('emitting')
    socket.emit('boardData', boardData, opponentId, currentPlayer, lobby)
    socket.off('reconnectRequest')
  }

  

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}
    >
      <View style={styles.modalView}>
        <Text style={styles.gameOverText} numberOfLines={1} adjustsFontSizeToFit>
                    Opponent has {reason}
        </Text>
        {reason === 'left' &&
                <View>
                  <Text style={styles.resultText} numberOfLines={1} adjustsFontSizeToFit>
                    You won!
                  </Text>
                  <CustomButton style={styles.customButton} title="Go home" onPress={navigation} />
                  <CustomButton style={styles.customButton} title="print" onPress={() => printData(board)}></CustomButton>
                </View>
        }
        {timer > 0
          ?<View>
            <CustomButton style={styles.customButton} title="print" onPress={() => printData(board)}></CustomButton>
            <Text style={styles.resultText} numberOfLines={1} adjustsFontSizeToFit>
                    Opponent forfeiting in {timer}s
            </Text>
          </View>
          :<View>
            <Text style={styles.resultText} numberOfLines={1} adjustsFontSizeToFit>
                        You won!
            </Text>
            <CustomButton style={styles.customButton} title="Go home" onPress={closeGame} />
          </View>
        }
                
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalView: {
    marginTop: '35%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 60,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 7,
    elevation: 5,
    width: '75%',
  },
  gameOverText: {
    fontSize: 32,
    marginBottom: 35,
    textAlign: 'center'
  },
  resultText: {
    fontSize: 25,
    marginBottom: 50,
    textAlign: 'center'
  },
  customButton: {
    alignSelf: 'baseline'
  }
})
