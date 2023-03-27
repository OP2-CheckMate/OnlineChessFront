import { View, Text, Modal, Pressable, Alert, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface ModalProps {
	isVisible: boolean;
	closeModal: () => void;
}
interface SquareProps {
	color1: string;
	color2: string;
}

const ProfileSettingsModal = ({ isVisible, closeModal }: ModalProps) => {
  const [ playerName, setPlayerName ] = useState('')
  useEffect(() => {
    getPlayerName()
  }, [])
  /* stores the player name in asyncStorage, so player does not need to set name everytime app starts */
  const storePlayerName = async (value: string) => {
    try {
      await AsyncStorage.setItem('playerName', value)
    } catch (error) {
      console.log(error)
    }
  }
  /* gets the current selected playerName from asyncStorage, and sets it in state */
  const getPlayerName = async () => {
    try {
      const value = await AsyncStorage.getItem('playerName')
      if (value !== null) {
        setPlayerName(value)
      } else {
        setPlayerName('')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={closeModal}>
        {/* we wrap everything in a touchable opacity, so that the modal 
				closes when the user clicks outside the modal */}
        <TouchableOpacity style={{ flex: 1 }} onPress={closeModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* if player has a name, show change name, else show set name */}
              <Text style={styles.modalText}>{playerName !== '' ? 'Change name' : 'Set name'}</Text>
              <View style={styles.themeWrapper}>
                <TextInput
                  value={playerName}
                  style={styles.input}
                  /* when changing the name, the name is stored in asyncStorage and in state */
                  onChangeText={(value) => {
                    setPlayerName(value)
                    storePlayerName(value)
                  }}
                  autoFocus={true}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

{
  /* close-button for modal if needed */
}
{
  /* <Pressable style={[ styles.button, styles.buttonClose ]} onPress={closeModal}>
<Text style={styles.textStyle}>Close</Text>
</Pressable> */
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    height: '50%',
    width: '70%',
    margin: 20,
    padding: 20,
    backgroundColor: 'rgba(110,93,53,0.95)',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginVertical: 15,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  themeWrapper: {
    width: '100%',
    justifyContent: 'center'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    color: 'darkgreen',
    backgroundColor: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
})

export default ProfileSettingsModal
