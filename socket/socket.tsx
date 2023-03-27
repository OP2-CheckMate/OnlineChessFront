import {io} from 'socket.io-client'
import { HOST_NAME } from '@env'

const socket = io('http://' + HOST_NAME + ':8080')

export default socket