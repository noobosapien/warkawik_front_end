import React, { useContext, useEffect, useRef, useState } from "react";
import ConsoleText from "./ConsoleText";
import { Warkawik } from "@/utils/WarkawikContext";

export default function Console({ messageHistory }) {
  const consoleTextRef = useRef();
  const [messages, setMessages] = useState([]);
  const { state, dispatch } = useContext(Warkawik);

  useEffect(() => {
    if (consoleTextRef.current && messageHistory != undefined) {
      let obj = JSON.parse(messageHistory);

      if (obj.status == 1) {
        dispatch({ type: "SHADER", payload: obj.content });
      }

      setMessages([...messages, obj]);
    }
  }, [messageHistory, consoleTextRef]);

  return (
    <>
      <section className="overflow-scroll h-[300px] dark:bg-slate-700 bg-slate-200 mt-12 sm:mt-24 rounded-xl">
        <div className="container flex flex-col mx-auto pb-24 pt-24 justify-center items-center">
          <div className="absolute -mt-48 space-y-4 items-center">
            <h1 className="text-2xl font-bold text-center p-6 rounded-2xl bg-white dark:bg-slate-900">
              Console
            </h1>
          </div>
        </div>

        <div ref={consoleTextRef} className="flex flex-col">
          {messages.map((msg) => (
            <ConsoleText
              key={Math.random() * 23 + 54 / Math.random()}
              msg={msg}
            />
          ))}
        </div>
      </section>
    </>
  );
}
