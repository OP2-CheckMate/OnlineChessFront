import React, { useEffect, useState } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
  Keyboard,
  Platform,
  TouchableOpacity,
} from 'react-native'
import socket from '../socket/socket'



interface ChatBoxProps {
  lobbyId: number
  playerId: string
}

interface Message {
  msg: string
  author: string
}

const ChatBox = ({ lobbyId, playerId }: ChatBoxProps) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState('')
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    socket.on('chat-message', (msg: string, author: string) => {
      setMessages((prevMessages) => [...prevMessages, { msg, author }])
    })
  }, [])

  // Listens to keyboard height and sets the state accordingly to move the input field up
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => setKeyboardHeight(e.endCoordinates.height),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardHeight(0),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('chat-message', message, lobbyId, playerId)
      //setPlayerCol(playerColor)
      setMessages((prevMessages) => [
        ...prevMessages,
        { msg: message, author: playerId },
      ])
    } else {
      return
    }
    setMessage('')
    Keyboard.dismiss();
  }
  const handleCloseButton = () => {
    setMessage('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => {
          const ownMsg = item.author === playerId ? true : false
          const styling = [
            ownMsg ? styles.messageContainer : styles.messageContainerOpponent,
            {
              backgroundColor: ownMsg ? '#dac477' : '#429785',
            },
          ]
          return (
            <View
              style={[
                styling,
                {
                  backgroundColor: 'rgba(0,0,0,0)',
                  flexDirection: 'row',
                  alignItems: 'center',
                },
              ]}
            >
              {ownMsg ? <Text>You :</Text> : <Text></Text>}
              <View style={styling}>
                <Text style={styles.message}>{item.msg}</Text>
              </View>
              {ownMsg ? <Text></Text> : <Text> : Opponent</Text>}
            </View>
          )
        }}
        keyExtractor={(item, index) => index.toString()}
        inverted
        contentContainerStyle={{ flexDirection: 'column-reverse' }}
      />
      <View
        style={[
          styles.inputContainer,
          { transform: [{ translateY: -keyboardHeight }] },
        ]}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message here"
          multiline
        />
        <TouchableOpacity
          style={styles.sendButtonStyle}
          onPress={handleSendMessage}
        >
          <Text style={{ color: 'white' }}>Send</Text>
        </TouchableOpacity>
        {// If keyboard is open or message is empty, show close button
        (keyboardHeight > 0 || message.length > 0 ) && (
        <TouchableOpacity
          style={styles.closeButtonStyle}
          onPress={handleCloseButton}
        >
          <Text style={{ color: 'white' }}>X</Text>
        </TouchableOpacity>
         )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a1a1a1',
  },
  messageContainer: {
    borderRadius: 16,
    marginHorizontal: 10,
    marginBottom: 5,
    marginTop: 5,
    padding: 10,
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  messageContainerOpponent: {
    borderRadius: 16,
    marginHorizontal: 10,
    marginBottom: 5,
    marginTop: 5,
    padding: 10,
    alignSelf: 'flex-end',
    maxWidth: '80%',
  },
  message: {
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 16,
    height: 60,
    width: '95%',
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 80,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 10,
    maxHeight: 100,
  },
  sendButtonStyle: {
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: 'darkgreen',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
  }, 
  closeButtonStyle:{
    borderRadius: 10,
    backgroundColor: '#72063c',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  }
})

export default ChatBox
