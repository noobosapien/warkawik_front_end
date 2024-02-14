import { Warkawik } from "@/utils/WarkawikContext";
import { useContext, useEffect, useRef, useState } from "react";

export default function Source() {
  const [indent, setIndent] = useState(0);
  const [shader, setShader] = useState("");
  const { state, dispatch } = useContext(Warkawik);

  const shaderRef = useRef();

  useEffect(() => {
    setShader(state.shader);
  }, [state]);

  useEffect(() => {
    if (shaderRef.current) {
      shaderRef.current.innerText = "";
      let lines = shader.split("\n");

      lines.forEach((line) => {
        shaderRef.current.innerText += line + "\n";
      });
    }
  }, [shader, shaderRef]);

  return (
    <>
      <div className="overflow-auto w-[300px] h-[300px] lg:w-[600px] lg:h-[800px] dark:bg-slate-700 bg-slate-200 rounded p-6">
        <p ref={shaderRef}></p>
      </div>
    </>
  );
}
