import { View, Text, Modal, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Themes } from './BoardThemes'

interface ModalProps {
  isVisible: boolean;
  closeModal: () => void;
}
interface SquareProps {
  color1: string;
  color2: string;
}

/* the colorbox shown on themes */
const Square = ({ color1, color2 }: SquareProps) => {
  return (
    <View style={styles.colorBox}>
      <View style={{ height: 20, width: 20, backgroundColor: color1 }} />
      <View style={{ height: 20, width: 20, backgroundColor: color2 }} />
      <View style={{ height: 20, width: 20, backgroundColor: color2 }} />
      <View style={{ height: 20, width: 20, backgroundColor: color1 }} />
    </View>
  )
}

const ThemeSettingsModal = ({ isVisible, closeModal }: ModalProps) => {
  const [selectedTheme, setSelectedTheme] = useState('')

  useEffect(() => {
    getTheme()
  }, [])
  /* stores the theme in asyncStorage, so player doesn't have to select theme everytime they start the app */
  const storeTheme = async (value: string) => {
    try {
      await AsyncStorage.setItem('theme', value)
    } catch (error) {
      console.log(error)
    }
  }
  /* gets the current selected theme from asyncStorage, and sets it as the selectedTheme state */
  const getTheme = async () => {
    try {
      const value = await AsyncStorage.getItem('theme')
      if (value !== null) {
        setSelectedTheme(value)
      } else {
        setSelectedTheme('0')
      }
    } catch (error) {
      console.log(error)
    }
  }
  /* whenever the player selects a theme, the theme is stored in asyncStorage, and the theme is updated */
  const onThemeChange = (value: number) => {
    storeTheme(value.toString())
    getTheme()
  }

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={closeModal}>
        {/* we wrap everything in a touchable opacity, so that the modal 
				closes when the user clicks outside the modal */}
        <TouchableOpacity style={{ flex: 1 }} onPress={closeModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Select Theme</Text>
              <View style={styles.themeWrapper}>
                <RadioForm>
                  {Themes.map((theme) => (
                    <RadioButton key={theme.value}>
                      <View style={styles.themeOption}>
                        <Pressable
                          onPress={() => {
                            onThemeChange(theme.value)
                          }}
                          style={styles.themeOption}
                        >
                          <RadioButtonInput
                            obj={theme}
                            index={theme.value}
                            isSelected={parseInt(selectedTheme) === theme.value}
                            onPress={() => {
                              onThemeChange(theme.value)
                            }}
                            buttonInnerColor={'rgb(19, 58, 28)'}
                            buttonOuterColor={
                              parseInt(selectedTheme) === theme.value ? (
                                'rgb(19, 58, 28)'
                              ) : (
                                '#000'
                              )
                            }
                            buttonSize={30}
                            buttonOuterSize={40}
                            buttonStyle={{}}
                          />
                          <RadioButtonLabel
                            obj={theme}
                            index={theme.value}
                            onPress={() => {
                              onThemeChange(theme.value)
                            }}
                            labelStyle={{ fontSize: 20, color: '#02421d' }}
                            labelWrapStyle={{}}
                          />
                          <Square color1={theme.col1} color2={theme.col2} />
                        </Pressable>
                      </View>
                    </RadioButton>
                  ))}
                </RadioForm>
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
    backgroundColor: 'rgba(255, 255, 255, 0.92),',
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: '#20653b'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginVertical: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  colorBox: {
    height: 41,
    width: 41,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 0.5,
    borderColor: 'rgb(134, 142, 136)'
  },
  themeWrapper: {
    width: '100%',
    justifyContent: 'center'
  },
  themeOption: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2
  }
})

export default ThemeSettingsModal
