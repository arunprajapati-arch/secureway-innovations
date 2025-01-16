"use client"
import React, { useEffect, useState } from 'react'
import { useSocket } from '@/hooks/useSocket'
import ViewLog from '@/components/ViewLog'

type Props = {}

interface Log {
  rfid?: string
  roll?: string
  username?: string
  access: string
}

const page = (props: Props) => {
  const [logs, setLogs] = useState<Log[]>([]);
  const { socket, isConnected } = useSocket(); // Get socket and connection state

  useEffect(() => {
    if (!socket) {
      console.log("No socket found");
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      const parsedData = JSON.parse(event.data);
      console.log(parsedData);

      const newLog: Log = {
        rfid: parsedData.id,
        roll: parsedData.roll,
        username: parsedData.username,
        access: parsedData.access
      };

      setLogs((previousLogs) => [...previousLogs, newLog]);
    };

    // Set up the onmessage event handler for the socket
    socket.onmessage = handleMessage;

    // Cleanup the event listener when component unmounts or socket changes
    return () => {
      if (socket) {
        socket.onmessage = null;
      }
    };
  }, [socket]); // This effect runs when socket is available or changes

  if (!isConnected) {
    return <div>Waiting for connection...</div>;
  }

  return (
    <div className="w-full bg-gray-100 p-4">
      <ViewLog logs={logs} />
    </div>
  );
};

export default page;
