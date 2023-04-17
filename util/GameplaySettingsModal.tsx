import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Switch,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomButton from './CustomButton'

interface ModalProps {
  isVisible: boolean
  closeModal: () => void
}

const GameplaySettingsModal = ({ isVisible, closeModal }: ModalProps) => {
  const [showPossibleMovesOption, setShowPossibleMovesOption] = useState(true)

  useEffect(() => {
    getOptions()
  }, [])

  /* stores the options in asyncStorage, 
    so player doesn't have to select gameplay settings everytime they start the app */
  const storeGameplayOptions = async (
    item: string,
    value: string | boolean
  ) => {
    try {
      await AsyncStorage.setItem(item, JSON.stringify(value))
    } catch (error) {
      console.log(error)
    }
  }
  /* gets the current selected option(s) from asyncStorage, and sets it as the selectedTheme state */
  const getOptions = async () => {
    try {
      const value = await AsyncStorage.getItem('showPossibleMoves')
      if (value !== null) {
        setShowPossibleMovesOption(JSON.parse(value))
      } else {
        setShowPossibleMovesOption(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={isVisible}
        onRequestClose={closeModal}
      >
        {/* we wrap everything in a touchable opacity, so that the modal 
				closes when the user clicks outside the modal */}
        <TouchableOpacity style={{ flex: 1 }} onPress={closeModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Gameplay Settings</Text>
              <View style={styles.themeWrapper}>
                <View style={styles.optionContainer}>
                  <Text style={styles.optionLabel}>
                    Highlight possible moves:
                  </Text>
                  <Switch
                    trackColor={{ false: '#767577', true: '#02421d' }}
                    thumbColor={showPossibleMovesOption ? 'gold' : '#f4f3f4'}
                    ios_backgroundColor='#3e3e3e'
                    onValueChange={(value) => {
                      setShowPossibleMovesOption(value)
                      storeGameplayOptions('showPossibleMoves', value)
                    }}
                    value={showPossibleMovesOption}
                  />
                </View>
              </View>
              <View style={{ justifyContent: 'space-between', flex: 1 }}>
                <View></View>
                <View style={styles.customBtn}>
                  <CustomButton
                    onPress={closeModal}
                    title='Save'
                  ></CustomButton>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    height: '50%',
    width: '70%',
    margin: 20,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.92),',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#20653b',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginVertical: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  colorBox: {
    height: 41,
    width: 41,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 0.5,
    borderColor: 'rgb(134, 142, 136)',
  },
  themeWrapper: {
    width: '100%',
    alignItems: 'stretch',
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  optionLabel: {
    fontSize: 16,
  },
  customBtn: {
    alignItems: 'flex-end',
  },
})

export default GameplaySettingsModal
