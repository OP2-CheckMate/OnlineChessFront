import React from 'react';
import { Modal, View, Text, StyleSheet, Button } from 'react-native';
import CustomButton from './CustomButton';
import { Dimensions } from 'react-native';


interface CheckmateModalProps {
  modalVisible: boolean;
  toggleModal: () => void;
  name: string;
  navigation: () => void;
}

interface ModalProps {
  modalVisible: boolean;
  toggleModal: () => void;
  navigation: () => void;
}

const height: any = Dimensions.get('window');

const CheckmateModal: React.FC<CheckmateModalProps> = ({ modalVisible, toggleModal, name, navigation }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}
    >
      <View style={styles.modalView}>
        <Text 
          style={{fontSize: 32, marginBottom: 35, textAlign: 'center'}}
          numberOfLines={1} adjustsFontSizeToFit
          >Game Over!</Text>
        <Text style={{fontSize: 25, marginBottom: 50, textAlign: 'center'}}
          numberOfLines={1} adjustsFontSizeToFit
          >{name} won!</Text>
        <CustomButton style={{alignSelf: 'baseline'}} title="Go home" onPress={navigation} /> 
      </View>
    </Modal>
  );
};

const DrawModal: React.FC<ModalProps> = ({ modalVisible, toggleModal, navigation }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}
    >
      <View style={styles.modalView}>
      <Text 
        style={{fontSize: 32, marginBottom: 35, textAlign: 'center'}}
        numberOfLines={1} adjustsFontSizeToFit
        >Game Over!</Text>
        <Text style={{fontSize: 25, marginBottom: 50, textAlign: 'center'}}
          numberOfLines={2} adjustsFontSizeToFit
          >Match ended in draw!</Text>
        <CustomButton style={{alignSelf: 'baseline'}} title="Go home" onPress={navigation} /> 
      </View>
    </Modal>
  );
};

const StalemateModal: React.FC<ModalProps> = ({ modalVisible, toggleModal, navigation }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}
    >
      <View style={styles.modalView}>
      <Text 
        style={{fontSize: 32, marginBottom: 35, textAlign: 'center'}}
        numberOfLines={1} adjustsFontSizeToFit
        >Game Over!</Text>
        <Text style={{fontSize: 25, marginBottom: 50, textAlign: 'center'}}
          numberOfLines={2} adjustsFontSizeToFit
          >Match ended in stalemate!</Text>
        <CustomButton style={{alignSelf: 'baseline'}} title="Go home" onPress={navigation} /> 
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
    
  },
});

