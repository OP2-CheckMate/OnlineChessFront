import {io} from 'socket.io-client'
import { HOST_NAME } from '@env'
//Reset cache for HOST_NAME -> npx expo start --clear

//const local = 'http://192.168.1.72:8080'

const socket = io(HOST_NAME)

export default socket