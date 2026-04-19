import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export function useSocket(onEmergency) {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_SOCKET_URL || "/", {
      transports: ["websocket"],
      withCredentials: true,
    });

    if (onEmergency) {
      socketRef.current.on("emergency-alert", onEmergency);
    }

    return () => {
      socketRef.current?.disconnect();
    };
  }, [onEmergency]);

  return socketRef.current;
}
