import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Button, TextInput, Pressable, Text } from 'react-native';
import { HOST_NAME } from '@env';
import CustomButton from '../util/CustomButton';

const QueuingScreen = ({ navigation }: any) => {
	const [ name, setName ] = useState('');
	const [ lobbyId, setlobbyId ] = useState('');
	const [ isDisabled, setIsDisabled ] = useState(true);
	const [ isJoinDisabled, setIsJoinDisabled ] = useState(true);
	const [ id, setId ] = useState('');

	const createGame = () => {
		// Set a name for player
		console.log(HOST_NAME)
		fetch('http://' + HOST_NAME + ':8080/api/queuing/createlobby', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({ name: name })
		})
			// get lobby info
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				navigation.navigate('LobbyCode', { lobby: data, playerName: name });
			})
			.catch((err) => console.error(err));
	};

	const joinGame = () => {
		// Post name and lobbyId to server
		fetch('http://' + HOST_NAME + ':8080/api/queuing/joinlobby', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({
				lobbyId: parseInt(lobbyId),
				name: name
			})
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				navigation.navigate('LobbyCode', { lobby: data }); //TODO: REDIRECT TO BOARD
			})
			//.then(navigation.navigate('LobbyCode', {lobbyId: lobbyId, "player2": {}}))
			.catch((err) => console.error(err));
	};

	return (
		<View style={styles.container}>
			<ImageBackground source={require('./images/settingsBgImage.png')} resizeMode="cover" style={styles.image}>
				<View style={styles.innerView}>
					<TextInput
						style={styles.input}
						onChangeText={(text) => {
							setName(text);
							if (text !== '') {
								setIsDisabled(false);
							} else {
								setIsDisabled(true);
							}
						}}
						value={name}
						placeholder="Enter your name"
						autoCapitalize="words"
						autoComplete="off"
						autoFocus={true}
						placeholderTextColor="rgb(110,93,53)"
					/>
					{/* custom made button with pressable component, so the button looks exactly the same in android and iOS */}
					<CustomButton title="Create Game" onPress={createGame} disabled={isDisabled} />
					<TextInput
						// Enter Lobby-ID
						style={styles.input}
						onChangeText={(text) => {
							setlobbyId(text);
							if (text !== '' && name !== '') {
								setIsJoinDisabled(false);
							} else {
								setIsJoinDisabled(true);
							}
						}}
						value={lobbyId}
						placeholder="Enter Lobby-Id"
						autoComplete="off"
						placeholderTextColor="rgb(110,93,53)"
					/>
					<CustomButton title="Join Game" onPress={joinGame} disabled={isJoinDisabled} />
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
		flex: 1
	},
	input: {
		height: 40,
		width: 200,
		margin: 12,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: 'rgb(3,15,6)',
		elevation: 5,

		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		textAlign: 'center',
		fontSize: 20
	},
	innerView: {
		alignItems: 'center',
		marginTop: 170
	}
});

export default QueuingScreen;
