import React, { useState } from 'react';
import { Text, View, ImageBackground, StyleSheet, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ThemeModal from '../util/ThemeModal';

const Settings = () => {
	const [ themeModalVisible, setThemeModalVisible ] = useState(false);

	return (
		<View style={styles.container}>
			<ImageBackground source={require('./images/settingsBgImage.png')} resizeMode="cover" style={styles.image}>
				<View>
					<View style={styles.btnView}>
						<FontAwesome.Button
							style={styles.settingsBtn}
							name="chevron-right"
							backgroundColor="rgba(0, 0, 0, 0.4)"
							color="white"
							size={25}
							//GAMEPLAY SETTINGS VALINNAT MODAALI AUKEE
							onPress={() => {}}
							//TEST
						>
							Gameplay
						</FontAwesome.Button>
					</View>
					<View style={styles.btnView}>
						<FontAwesome.Button
							style={styles.settingsBtn}
							name="chevron-right"
							backgroundColor="rgba(0, 0, 0, 0.4)"
							color="white"
							size={25}
							onPress={() => {
								setThemeModalVisible(true);
							}}
						>
							Theme
						</FontAwesome.Button>
					</View>
					<View style={styles.btnView}>
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
					{/* show ThemeModal if ThemeModalVisible is true */}
					<ThemeModal isVisible={themeModalVisible} closeModal={() => setThemeModalVisible(false)} />
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
	wrapper: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	settingsBtn: {
		flexDirection: 'row-reverse',
		justifyContent: 'space-between'
	},
	btnView: {
		marginVertical: 2
	}
});

export default Settings;
