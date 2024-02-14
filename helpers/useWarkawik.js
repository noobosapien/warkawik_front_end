import React, { useState, useCallback, useEffect } from "react";

export default function useWarkawik() {
  const [websocket, setWebsocket] = useState(null);
  const [socketUrl, setSocketUrl] = useState("wss://api.warkawik.com/agent");
  const [messageHistory, setMessageHistory] = useState();

  useEffect(() => {
    let connect = async () => {
      const socket = new WebSocket(socketUrl);

      socket.addEventListener("open", (event) => {
        let obj = {
          status: 2,
          content: "Connection established",
        };

        setMessageHistory(JSON.stringify(obj));
      });

      socket.addEventListener("message", (event) => {
        setMessageHistory(event.data);
      });

      setWebsocket(socket);
    };

    if (!websocket) connect();
  }, []);

  const sendMessage = (message) => {
    if (websocket) {
      websocket.send(message);
    }
  };

  return { websocket, messageHistory, sendMessage };
}
