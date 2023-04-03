import React, { useState } from 'react'
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
  onSendMessage: (message: string) => void
  messages: string[]
}

const ChatBox = ({ onSendMessage, messages }: ChatBoxProps) => {
  const [message, setMessage] = useState('')

  socket.on('chat-message', (message: string) => {
    onSendMessage(message)
  })

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      onSendMessage(message)
      socket.emit('chat-message', message)
      setMessage('')
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{item}</Text>
          </View>
        )}
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
    backgroundColor: 'rgb(247, 243, 186)',
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
