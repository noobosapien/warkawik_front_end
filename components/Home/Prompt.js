import { useEffect, useRef, useState } from "react";

export default function Prompt({ sendMessage, messageHistory }) {
  const formRef = useRef();
  const inputRef = useRef();
  const msgRef = useRef();

  const [input, setInput] = useState("");
  const [disabled, setDisabled] = useState(false);

  let generate = async (e) => {
    e.preventDefault();
    setDisabled(true);
    sendMessage(input);
  };

  useEffect(() => {
    if (messageHistory) {
      let obj = JSON.parse(messageHistory);

      if (obj.status == 1) {
        setDisabled(false);
      }
    }
  }, [messageHistory]);

  return (
    <>
      <section className="flex justify-center">
        <div className="w-full mx-auto p-6 space-y-6">
          <form
            ref={formRef}
            action=""
            id="link-form"
            className="relative flex flex-col w-full p-10 -mt-20 space-y-4 bg-slate-300 dark:bg-slate-800 rounded-lg md:flex-row md:space-y-0 md:space-x-3"
          >
            <input
              type="text"
              className="flex-1 p-3 border-2 rounded-lg placeholder-slate-500 focus:outline-none dark:text-slate-800"
              placeholder="Enter your prompt"
              id="link-input"
              onChange={(e) => setInput(e.target.value)}
              ref={inputRef}
            />

            <button
              onClick={generate}
              className={`px-10 py-3 text-white ${
                disabled
                  ? "bg-gray-300 hover:bg-gray-300"
                  : "bg-cyan-600 hover:bg-cyan-500"
              } rounded-lg  focus:outline-none md:py-2`}
              disabled={disabled}
            >
              <span>{disabled ? "Generating..." : "Generate"}</span>
            </button>

            <div
              ref={msgRef}
              className="absolute left-7 bottom-3 text-red text-small italic"
            ></div>
          </form>
        </div>
      </section>
    </>
  );
}
