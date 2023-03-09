import { Text, View, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { Themes } from './BoardThemes';
import { useIsFocused } from '@react-navigation/native';

interface RowProps {
	row: number;
}
interface SquareProps extends RowProps {
	col: number;
}

export default function Board() {
	const [ colorOne, setColorOne ] = useState('');
	const [ colorTwo, setColorTwo ] = useState('');
	const isFocused = useIsFocused();

	useEffect(() => {
		getTheme();
	}, []);

	const getTheme = async () => {
		try {
			let value = await AsyncStorage.getItem('theme');
			if (value !== null) {
				setColorOne(Themes[parseInt(value)].col1);
				setColorTwo(Themes[parseInt(value)].col2);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const Row = ({ row }: RowProps) => {
		return (
			<View style={{ flex: 1, flexDirection: 'row' }}>
				{new Array(8).fill(0).map((_, col) => <Square row={row} col={col} key={col} />)}
			</View>
		);
	};

	const Square = ({ row, col }: SquareProps) => {
		/* we call getTheme() in the useEffect, so that the colors of the 
	  board are updated whenever the player changes the theme */

		const offset = row % 2 === 0 ? 1 : 0;
		const backgroundColor = (col + offset) % 2 === 0 ? colorTwo : colorOne;
		const color = (col + offset) % 2 === 0 ? colorOne : colorTwo;

		return (
			<View style={{ flex: 1, backgroundColor: backgroundColor, padding: 5 }}>
				<Text style={{ color: color, opacity: col === 0 ? 1 : 0 }}>{8 - row}</Text>
				<Text style={{ color: color, opacity: row === 7 ? 1 : 0, alignSelf: 'flex-end' }}>
					{String.fromCharCode('a'.charCodeAt(0) + col)}
				</Text>
			</View>
		);
	};
	return <View style={styles.container}>{new Array(8).fill(0).map((_, row) => <Row row={row} key={row} />)}</View>;
}
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
	container: {
		width,
		height: width
	}
});
