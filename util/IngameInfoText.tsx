import {
    View,
    StyleSheet,
    Text,
} from 'react-native'
import { Move } from 'chess.js'

interface InfoTextProps {
    currentPlayer: string
    playerName: string
    lastPlayer: string
    inCheck: boolean
    move: Move | null
}

export const InfoText = ({
    currentPlayer,
    playerName,
    lastPlayer,
    inCheck,
    move

}: InfoTextProps) => (

    <View style={styles.infoText}>
        <Text >
            {
                currentPlayer === playerName
                    ? "Your turn!"
                    : `${currentPlayer}s turn`
            }
        </Text>
        <Text >
            {inCheck
                ? `${lastPlayer} has checked the game!`
                : move
                    ? `Last move: ${move.from} to ${move.to}`
                    : 'No move made yet'}
        </Text>
    </View>
)

const styles = StyleSheet.create({
    infoText: {
        flex: 0.06,
        flexDirection: 'row',
        paddingRight: 5,
        paddingLeft: 5,
        justifyContent: 'space-between',
        borderStyle: 'solid',
        borderColor: '#2F351F',
        borderWidth: 1
    }
})