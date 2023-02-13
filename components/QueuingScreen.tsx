import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Button, TextInput, Pressable, Text } from 'react-native';
import {HOST_NAME} from '@env'

const QueuingScreen = ({ navigation }: any) => {
	const [ name, setName ] = useState('');
	const [ lobbyId, setlobbyId ] = useState('');
	const [ isDisabled, setIsDisabled ] = useState(true);
	const [ isJoinDisabled, setIsJoinDisabled ] = useState(true);
	const [ id, setId ] = useState("");

	const createGame = () => {
			// Set a name for player
			fetch("http://"+HOST_NAME+":8080/api/queuing/createlobby",{
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({name: name}),
			})
			// get player's ID
			.then(response => response.json())
			.then(data => {
				console.log(data)
				setId(data.id);

			})
			.catch(err => console.error(err));
		

	};
	
	const joinGame = () => {
		// Post name and lobbyId to server
		fetch("http://"+HOST_NAME+":8080/api/queuing/joinlobby",{
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify({
				lobbyId: lobbyId,
				name: name}),
		})
		// get player's ID
		.then(response => response.json())
		.then(data => {
			console.log(data)
			setId(data.id);
		})
		.catch(err => console.error(err));

	}

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
					<View style={styles.btnOuterContainer}>
						<Pressable
							//if the button is disabled, the color will be grey
							//when pressed, the button will be a little bit lighter, otherwise go with the default style
							style={({ pressed }) => {
								if (isDisabled) {
									return [ styles.disabledBtn ];
								} else {
									return pressed
										? [ styles.btnInnerContainer, styles.pressed ]
										: styles.btnInnerContainer;
								}
							}}
							onPress={createGame}
							disabled={isDisabled}
						>
							<Text style={isDisabled ? styles.disabledbtnText : styles.btnText}>Create Game</Text>
						</Pressable>
						
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
						<Pressable
							// Join Game Button
							style={({ pressed }) => {
								if (isDisabled) {
									return [ styles.disabledBtn ];
								} else {
									return pressed
										? [ styles.btnInnerContainer, styles.pressed ]
										: styles.btnInnerContainer;
								}
							}}
							onPress={joinGame}
							disabled={isJoinDisabled}
						>
							<Text style={isJoinDisabled ? styles.disabledbtnText : styles.btnText}>Join Game</Text>
						</Pressable>
						
					</View>
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
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
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
	btnText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16
	},
	pressed: {
		opacity: 0.75
	},
	disabledBtn: {
		backgroundColor: '#9e9e9e',
		paddingVertical: 12,
		paddingHorizontal: 14
	},
	disabledbtnText: {
		color: 'rgb(124, 123, 123)',
		fontWeight: 'bold',
		fontSize: 16
	}
});

export default QueuingScreen;
