import React from 'react';
import { Modal, View, Text, StyleSheet, Button } from 'react-native';
import CustomButton from './CustomButton';



interface ModalProps {
  modalVisible: boolean;
  toggleModal: () => void;
  name: string;
}


const CheckmateModal: React.FC<ModalProps> = ({ modalVisible, toggleModal, name }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}
    >
      <View style={styles.modalView}>
        <Text style={{fontSize: 32, marginBottom: 35}}>Game Over!</Text>
        <Text style={{fontSize: 20, marginBottom: 50}}>Player {name} won</Text>
        <CustomButton style={{alignSelf: 'baseline'}} title="Go home" onPress={() => toggleModal()} /> 
      </View>
    </Modal>
  );
};

const DrawModal: React.FC<ModalProps> = ({ modalVisible, toggleModal }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}
    >
      <View style={styles.modalView}>
        <Text style={{fontSize: 32, marginBottom: 35}}>Game Over!</Text>
        <Text style={{fontSize: 20, marginBottom: 50}}>Match ended in draw</Text>
        <CustomButton style={{alignSelf: 'baseline'}} title="Go home" onPress={() => toggleModal()} /> 
      </View>
    </Modal>
  );
};

const StalemateModal: React.FC<ModalProps> = ({ modalVisible, toggleModal }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}
    >
      <View style={styles.modalView}>
        <Text style={{fontSize: 32, marginBottom: 35}}>Game Over!</Text>
        <Text style={{fontSize: 20, marginBottom: 50}}>Match ended in stalemate</Text>
        <CustomButton style={{alignSelf: 'baseline'}} title="Go home" onPress={() => toggleModal()} /> 
      </View>
    </Modal>
  );
};

export {CheckmateModal, DrawModal, StalemateModal};

const styles = StyleSheet.create({

  modalView: {
    marginTop: "35%",
    alignSelf: "center",
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
    width: "75%",
    height: "40%",
  },
});

