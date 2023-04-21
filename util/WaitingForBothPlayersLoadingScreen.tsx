import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from "react-native"

interface props { opponentDisconnected: boolean }

export const WaitingForBothPlayersLoadingView = ( {opponentDisconnected}: props ) => {
    return (
        <View style={styles.loadingOverlay} >
            <Text style={{ marginBottom: 20, fontSize: 20 }}>
                {opponentDisconnected ? 
                'Opponent disconnected' 
                : 
                ' Waiting for opponent to enter the game'}
                
            </Text>
            <ActivityIndicator
                color='#1A1F16'
                style={{ marginBottom: 20 }}
                size='large'
                animating={true}
            ></ActivityIndicator>
        </View>
    )
}
const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
    loadingOverlay: {
        position: 'absolute',
        top: '25%',
        backgroundColor: 'rgba(255,255,255,0.7)',
        width: width - 10,
        marginLeft: 5,
        height: '50%',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        
    }
})