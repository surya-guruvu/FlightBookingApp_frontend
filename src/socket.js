// socket.js

import io from 'socket.io-client';

let socket = null;

export function initializeSocket(jwtToken) {
  if (!socket) {
    console.log("Yes");
    socket = io('/', { query: {
      token: jwtToken,
    }}); 
  }
}

export function getSocket() {
  return socket;
}
