import React, { useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, Button, TextInput } from 'react-native';

const QueuingScreen = () => {
	const [ name, setName ] = useState('');

	const searchOpponent = () => {
		console.log('Search opponent');
	};

	return (
		<View style={styles.container}>
			<ImageBackground source={require('./images/settingsBgImage.png')} resizeMode="cover" style={styles.image}>
				<View>
					<TextInput style={styles.input} placeholder="Enter your name" />
					<Button disabled={name === ''} title="Search opponent" onPress={searchOpponent} />
				</View>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	image: {
		flex: 1,
		justifyContent: 'center'
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1
	},
	innerView: {
		flex: 1
	}
});

export default QueuingScreen;
