import { View, Text, Modal, Pressable, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

interface ModalProps {
	isVisible: boolean;
	closeModal: () => void;
}
interface SquareProps {
	color1: string;
	color2: string;
}

const Themes = [
	{ label: 'Default', value: 0, col1: 'rgb(176, 157, 144)', col2: 'rgb(74, 67, 62)' },
	{ label: 'Fin', value: 1, col1: 'white', col2: 'darkblue' },
	{ label: 'Swe', value: 2, col1: 'yellow', col2: 'darkblue' }
];

const Square = ({ color1, color2 }: SquareProps) => {
	return (
		<View style={styles.colorBox}>
			<View style={{ height: 20, width: 20, backgroundColor: color1 }} />
			<View style={{ height: 20, width: 20, backgroundColor: color2 }} />
			<View style={{ height: 20, width: 20, backgroundColor: color2 }} />
			<View style={{ height: 20, width: 20, backgroundColor: color1 }} />
		</View>
	);
};

const ThemeModal = ({ isVisible, closeModal }: ModalProps) => {
	const [ selectedTheme, setSelectedTheme ] = useState(0);

	const onThemeChange = (value: number) => {
		setSelectedTheme(value);
		console.log('pressed btn with value: ' + value);
	};

	return (
		<View style={styles.centeredView}>
			<Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={closeModal}>
				<TouchableOpacity style={{ flex: 1 }} onPress={closeModal}>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text style={styles.modalText}>Select Theme</Text>
							<RadioForm>
								{Themes.map((theme) => (
									<View style={styles.themeWrapper} key={theme.value}>
										<RadioButton>
											<RadioButtonInput
												obj={theme}
												index={theme.value}
												isSelected={selectedTheme === theme.value}
												onPress={() => {
													onThemeChange(theme.value);
												}}
												buttonInnerColor={'rgb(30, 92, 46)'}
												buttonOuterColor={
													selectedTheme === theme.value ? 'rgb(30, 92, 46)' : '#000'
												}
												buttonSize={30}
												buttonOuterSize={40}
												buttonStyle={{}}
											/>
											<RadioButtonLabel
												obj={theme}
												index={theme.value}
												onPress={() => {
													onThemeChange(theme.value);
												}}
												labelStyle={{ fontSize: 20, color: '#02421d' }}
												labelWrapStyle={{}}
											/>
											<Square color1={theme.col1} color2={theme.col2} />
										</RadioButton>
									</View>
								))}
							</RadioForm>
						</View>
					</View>
				</TouchableOpacity>
			</Modal>
		</View>
	);
};

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
	},
	colorBox: {
		height: 40,
		width: 40,
		flexDirection: 'row',
		flexWrap: 'wrap',
		border: 1,
		borderColor: 'black',
		borderWidth: 0.5
	},
	themeWrapper: {
		/* justifyContent: 'center' */
	}
});

export default ThemeModal;
