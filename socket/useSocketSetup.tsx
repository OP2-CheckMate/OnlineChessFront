import { useEffect } from 'react'
import socket from './socket'

/** Create one time connection to backend with socket*/
export const useSocketSetup = () => {
  useEffect(() => {
    socket.connect()
  })
}