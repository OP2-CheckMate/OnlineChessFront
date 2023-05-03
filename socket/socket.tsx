import {io} from 'socket.io-client'
import { HOST_NAME } from '@env'
//Reset cache for HOST_NAME -> npx expo start --clear

//const local = 'http://87.92.66.115:8080'

const socket = io('http://87.94.154.110:8080')

export default socket