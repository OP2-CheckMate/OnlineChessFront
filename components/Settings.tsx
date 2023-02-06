import React from 'react';
import { Text, View, ImageBackground, StyleSheet, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Settings = () => {
	return (
		<View style={styles.container}>
			<ImageBackground source={require('./images/settingsBgImage.png')} resizeMode="cover" style={styles.image}>
				<View>
					<FontAwesome.Button
						style={styles.settingsBtn}
						name="chevron-right"
						backgroundColor="rgba(0, 0, 0, 0.4)"
						color="white"
						size={25}
						//GAMEPLAY SETTINGS VALINNAT MODAALI AUKEE
						onPress={() => {}}
					>
						Gameplay
					</FontAwesome.Button>
				</View>
				<View>
					<FontAwesome.Button
						style={styles.settingsBtn}
						name="chevron-right"
						backgroundColor="rgba(0, 0, 0, 0.4)"
						color="white"
						size={25}
						//THEME SETTINGS VALINNAT MODAALI AUKEE
						onPress={() => {}}
					>
						Theme
					</FontAwesome.Button>
				</View>
				<View>
					<FontAwesome.Button
						style={styles.settingsBtn}
						name="chevron-right"
						backgroundColor="rgba(0, 0, 0, 0.4)"
						color="white"
						size={25}
						//PROFILE SETTINGS VALINNAT MODAALI AUKEE
						onPress={() => {}}
					>
						Profile
					</FontAwesome.Button>
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
	settingsBtn: {
		flexDirection: 'row-reverse',
		justifyContent: 'space-between'
	}
});

export default Settings;
