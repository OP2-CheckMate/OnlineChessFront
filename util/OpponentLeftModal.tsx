import React from 'react'
import { Modal, View, Text, StyleSheet } from 'react-native'
import CustomButton from './CustomButton'

interface ModalProps {
    opponentDisconnected: boolean;
    opponentLeft: boolean;
    modalVisible: boolean;
    toggleModal: () => void;
    navigation: () => void;
}


export const OpponentLeftModal: React.FC<ModalProps> = ({ opponentDisconnected, opponentLeft, modalVisible, toggleModal, navigation }) => {

    const reason = opponentDisconnected ? 'disconnected' : 'left'

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={toggleModal}
        >
            <View style={styles.modalView}>
                <Text style={styles.gameOverText} numberOfLines={1} adjustsFontSizeToFit>
                    Opponent has {reason}
                </Text>
                <Text style={styles.resultText} numberOfLines={1} adjustsFontSizeToFit>
                    You won!
                </Text>
                <CustomButton style={styles.customButton} title="Go home" onPress={navigation} />
            </View>
        </Modal>
    )
}

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
