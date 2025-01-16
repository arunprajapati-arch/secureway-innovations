"use client"
import React, { useEffect, useRef } from 'react'



interface Log {
    rfid?: string
    roll?: string
    username?: string
    access: string
  }

  interface LogProps {
    logs: Log[]
  }

const ViewLog = ({logs}: LogProps) => {
    const logsEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (logsEndRef.current) {
          logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, [logs]);

  return (
    <div className="flex-1 border h-[80vh] overflow-y-auto p-4 space-y-4">
        {logs.map((log,idx) => (
            <div key = {idx} className='flex items-center justify-center gap-2'>
                <div className='max-w-xs p-2 rounded-full'>
                <p className='bg-green-400 p-3 rounded-full'>{log.roll},{log.rfid},{log.username},{log.access}</p>
                </div>
            </div>
        ))}
        <div ref={logsEndRef} />
    </div>
  )
}

export default ViewLog