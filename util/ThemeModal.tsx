import { View, Text, Modal, Pressable, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import RadioForm from 'react-native-simple-radio-button';

interface Props {
	isVisible: boolean;
	closeModal: () => void;
}

const ThemeModal = ({ isVisible, closeModal }: Props) => {
	return (
		<View style={styles.centeredView}>
			<Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={closeModal}>
				<TouchableOpacity style={{ flex: 1 }} onPress={closeModal}>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text style={styles.modalText}>Select Theme</Text>
							{/* radiobuttons for theme-selection */}
							<RadioForm
								radio_props={[ { label: 'Light', value: 0 }, { label: 'Dark', value: 1 } ]}
								initial={0}
								onPress={(value) => {
									console.log(value);
								}}
							/>
							{/* close-button for modal if needed */}
							{/* <Pressable style={[ styles.button, styles.buttonClose ]} onPress={closeModal}>
								<Text style={styles.textStyle}>Close</Text>
							</Pressable> */}
						</View>
					</View>
				</TouchableOpacity>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
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
		marginBottom: 15,
		textAlign: 'center'
	}
});

export default ThemeModal;
