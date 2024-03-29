import React from 'react'
import { Modal, View, Text, StyleSheet } from 'react-native'
import CustomButton from './CustomButton'

interface ModalProps {
  modalVisible: boolean;
  toggleModal: () => void;
}

interface CheckmateModalProps extends ModalProps {
  name: string;
  navigation: () => void;
}

interface NavigationModalProps extends ModalProps {
  navigation: () => void;
}


const CheckmateModal: React.FC<CheckmateModalProps> = ({ modalVisible, toggleModal, name, navigation }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}
    >
      <View style={styles.modalView}>
        <Text style={styles.gameOverText} numberOfLines={1} adjustsFontSizeToFit>
          Game Over!
        </Text>
        <Text style={styles.resultText} numberOfLines={1} adjustsFontSizeToFit>
          {name} won!
        </Text>
        <CustomButton style={styles.customButton} title="Go home" onPress={navigation} />
      </View>
    </Modal>
  )
}

const DrawModal: React.FC<NavigationModalProps> = ({ modalVisible, toggleModal, navigation }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}
    >
      <View style={styles.modalView}>
        <Text style={styles.gameOverText} numberOfLines={1} adjustsFontSizeToFit>
          Game Over!
        </Text>
        <Text style={styles.resultText} numberOfLines={2} adjustsFontSizeToFit>
          Match ended in draw!
        </Text>
        <CustomButton style={styles.customButton} title="Go home" onPress={navigation} />
      </View>
    </Modal>
  )
}

const StalemateModal: React.FC<NavigationModalProps> = ({ modalVisible, toggleModal, navigation }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}
    >
      <View style={styles.modalView}>
        <Text style={styles.gameOverText} numberOfLines={1} adjustsFontSizeToFit>
          Game Over!
        </Text>
        <Text style={styles.resultText} numberOfLines={2} adjustsFontSizeToFit>
          Match ended in stalemate!
        </Text>
        <CustomButton style={styles.customButton} title="Go home" onPress={navigation} />
      </View>
    </Modal>
  )
}

export { CheckmateModal, DrawModal, StalemateModal, ModalProps, styles }

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

