import { useEffect, useState } from 'react';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001'; // Can be configurable via .env

export const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false); // Track connection state

  useEffect(() => {
    // Create the WebSocket instance
    const ws = new WebSocket(WS_URL);

    // Set up WebSocket event handlers
    ws.onopen = () => {
      console.log("socket connected");
      setSocket(ws);
      setIsConnected(true); // Set connected state to true
    };

    ws.onclose = () => {
      console.log("socket closed");
      setSocket(null);
      setIsConnected(false); // Set connected state to false
    };

    ws.onerror = (error) => {
      console.log('WebSocket error:', error);
      setIsConnected(false); // Ensure disconnected state on error
    };

    // Cleanup WebSocket connection when the component is unmounted
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []); 

  return { socket, isConnected };
};
