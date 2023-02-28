import { View, Text, ViewStyle, TextStyle, Pressable, StyleSheet } from 'react-native';
import React, { FC } from 'react';

interface Props {
	onPress: () => void;
	title: string;
	style?: ViewStyle | ViewStyle[];
	disabled?: boolean;
	joinDisabled?: boolean;
}
/* CUSTOM BUTTON COMPONENT THAT LOOKS THE SAME ON ANDROID AND IOS. NEEDED HERE BECAUSE WE USE BACKGROUND
IMAGES THAT MAKE THE BUTTONS HARD TO SEE ESPECIALLY ON IOS. */
const CustomButton: FC<Props> = ({ onPress, title, style, disabled, joinDisabled }) => {
	return (
		<View style={styles.btnOuterContainer}>
			<Pressable
				//if the button is disabled, the color will be grey
				//when pressed, the button will be a little bit lighter, otherwise go with the default style
				style={({ pressed }) => {
					if (disabled) {
						return [ styles.disabledBtn ];
					} else {
						return pressed ? [ styles.btnInnerContainer, styles.pressed ] : styles.btnInnerContainer;
					}
				}}
				onPress={onPress}
				disabled={disabled}
			>
				<Text style={disabled ? styles.disabledBtnText : styles.btnText}>{title}</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	btnOuterContainer: {
		borderRadius: 8,
		margin: 4,
		overflow: 'hidden',
		elevation: 4,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.25,
		shadowRadius: 4
	},
	btnInnerContainer: {
		backgroundColor: '#72063c',
		paddingVertical: 12,
		paddingHorizontal: 14
	},
	disabledBtn: {
		backgroundColor: '#9e9e9e',
		paddingVertical: 12,
		paddingHorizontal: 14
	},
	disabledBtnText: {
		color: 'rgb(124, 123, 123)',
		fontWeight: 'bold',
		fontSize: 16
	},
	btnText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16
	},
	pressed: {
		opacity: 0.75
	}
});

export default CustomButton;
