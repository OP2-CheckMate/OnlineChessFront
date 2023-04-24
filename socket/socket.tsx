import {io} from 'socket.io-client'
import { HOST_NAME} from '@env';
//Reset cache for HOST_NAME -> npx expo start --clear

const localSocket = `http://${HOST_NAME}:8080`;
const socket = io(localSocket);

export default socket;