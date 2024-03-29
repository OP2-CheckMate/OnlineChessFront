import React, { useState } from 'react'
import { View, ImageBackground, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import ThemeSettingsModal from '../util/ThemeSettingsModal'
import ProfileSettingsModal from '../util/ProfileSettingsModal'
import GameplaySettingsModal from '../util/GameplaySettingsModal'
import { StatusBar } from 'expo-status-bar'

const Settings = () => {
  const [themeModalVisible, setThemeModalVisible] = useState(false)
  const [profileModalVisible, setProfileModalVisible] = useState(false)
  const [gameplayModalVisible, setGameplayModalVisible] = useState(false)

  return (
    <View style={styles.container}>
      <StatusBar style='dark' />
      <ImageBackground source={require('./images/settingsBgImage.png')} resizeMode="cover" style={styles.image}>
        <View>
          <View style={styles.btnView}>
            <FontAwesome.Button
              style={styles.settingsBtn}
              name="chevron-right"
              backgroundColor="rgba(0, 0, 0, 0.4)"
              color="white"
              size={25}
              //GAMEPLAY SETTINGS VALINNAT MODAALI AUKEE
              onPress={() => {
                setGameplayModalVisible(true)
              }}
            //TEST
            >
              Gameplay
            </FontAwesome.Button>
          </View>
          <View style={styles.btnView}>
            <FontAwesome.Button
              style={styles.settingsBtn}
              name="chevron-right"
              backgroundColor="rgba(0, 0, 0, 0.4)"
              color="white"
              size={25}
              onPress={() => {
                setThemeModalVisible(true)
              }}
            >
              Theme
            </FontAwesome.Button>
          </View>
          <View style={styles.btnView}>
            <FontAwesome.Button
              style={styles.settingsBtn}
              name="chevron-right"
              backgroundColor="rgba(0, 0, 0, 0.4)"
              color="white"
              size={25}
              //PROFILE SETTINGS VALINNAT MODAALI AUKEE
              onPress={() => {
                setProfileModalVisible(true)
              }}
            >
              Profile
            </FontAwesome.Button>
          </View>
          {/* show ThemeSettingsModal if themeModalVisible is true */}
          <ThemeSettingsModal isVisible={themeModalVisible} closeModal={() => setThemeModalVisible(false)} />
          {/* show ProfileSettingsModal if profileModalVisible is true */}
          <ProfileSettingsModal
            isVisible={profileModalVisible}
            closeModal={() => setProfileModalVisible(false)}
          />
          <GameplaySettingsModal isVisible={gameplayModalVisible}
            closeModal={() => setGameplayModalVisible(false)} />
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    justifyContent: 'center'
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  settingsBtn: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between'
  },
  btnView: {
    marginVertical: 2
  }
})

export default Settings
