import React from 'react'
import { Modal, View, Text } from 'react-native'
import CustomButton from './CustomButton'
import { styles } from './GameOverModal'

interface ModalProps {
  modalVisible: boolean;
  toggleModal: () => void;
  navigate: () => void;
  reconnectReq: () => void;
}

export default function ReconnectModal({ modalVisible, toggleModal, navigate }: ModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}
    >
      <View style={styles.modalView}>
        <Text>You have ongoing game!</Text>
        <CustomButton style={{ alignSelf: 'baseline' }} title="Forfeit" onPress={() => toggleModal()} />
        <CustomButton style={{ alignSelf: 'baseline' }} title="Reconnect" onPress={() => navigate()} />
      </View>
    </Modal>
  )
}