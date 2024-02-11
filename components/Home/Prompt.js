import { useRef } from "react";

export default function Prompt() {
  const formRef = useRef();
  const inputRef = useRef();
  const msgRef = useRef();

  let generate = async (e) => {
    e.preventDefault();
  };

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
              ref={inputRef}
            />

            <button
              onClick={generate}
              className="px-10 py-3 text-white bg-cyan-600 rounded-lg hover:bg-cyan-500 focus:outline-none md:py-2"
            >
              Generate
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
