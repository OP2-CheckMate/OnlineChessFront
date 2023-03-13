import React from 'react';
import { Modal, View, Text, StyleSheet} from 'react-native';
import CustomButton from './CustomButton';
import { ModalProps, styles } from './GameOverModal';

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