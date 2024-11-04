import { io } from 'socket.io-client';

const SOCKET_URL = 'wss://api.example.com'; // Replace with your WebSocket server URL

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export const connectSocket = () => {
  socket.connect();
};

export const disconnectSocket = () => {
  socket.disconnect();
};