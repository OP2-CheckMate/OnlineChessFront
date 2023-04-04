import React, { useEffect, useState } from 'react'
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Text,
} from 'react-native'
import socket from '../socket/socket'

interface ChatBoxProps {
  lobbyId: number
  playerColor: string
}

const ChatBox = ({ lobbyId, playerColor }: ChatBoxProps) => {
  const [messages, setMessages] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const [playerCol, setPlayerCol] = useState('')

  useEffect(() => {
    socket.on('chat-message', (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, msg])
    })
  }, [])

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('chat-message', message, lobbyId, playerColor)
      setPlayerCol(playerColor)
      setMessages((prevMessages) => [...prevMessages, message])
    } else {
      return
    }
    setMessage('')
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => {
          const styling = [
            styles.messageContainer,
            {
              backgroundColor:
                playerCol === 'w' ? 'rgb(187, 113, 16)' : 'rgb(216, 19, 255)',
            },
          ]
          return (
            <View style={styling}>
              <Text style={styles.message}>{item}</Text>
            </View>
          )
        }}
        keyExtractor={(item, index) => index.toString()}
        inverted
        contentContainerStyle={{ flexDirection: 'column-reverse' }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder='Type your message here'
          multiline
        />
        <Button title='Send' onPress={handleSendMessage} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(60, 92, 34)',
    marginTop: 10,
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
    width: '70%',
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 100,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 10,
    maxHeight: 100,
  },
})

export default ChatBox
