import { io } from "socket.io-client"
import React from 'react';
const socketURL = "http://localhost:5001"

export const socket = io(socketURL);
export const AppContext = React.createContext();