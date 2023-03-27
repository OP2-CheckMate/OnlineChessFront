import React from 'react'
import { Modal, View, Text} from 'react-native'
import CustomButton from './CustomButton'
import { styles } from './GameOverModal'

interface ModalProps {
  modalVisible: boolean;
  toggleModal: () => void;
}

export default function BadLobbyCodeModal({ modalVisible, toggleModal }: ModalProps) {
  return(
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}
    >
      <View style={styles.modalView}>
        <Text>Lobby does not exist</Text>
        <CustomButton style={{alignSelf: 'baseline'}} title="OK" onPress={() => toggleModal()} />
      </View>
    </Modal>
  )
}