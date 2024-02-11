import React from "react";
import Canvas from "./Canvas";
import Source from "./Source";

export default function ShaderArea() {
  return (
    <>
      <section className="min-h-48 p-6">
        <div className="container flex flex-col lg:flex-row mx-auto lg:pt-32 justify-center items-center">
          <div className="container flex flex-col items-center px-6 mx-auto justify-evenly space-y-6">
            <h1 className="text-4xl font-bold text-center">Shader</h1>
            <Canvas />
          </div>

          <div className="container flex flex-col items-center px-6 mx-auto justify-evenly space-y-6 ">
            <h1 className="text-4xl font-bold text-center">Shader Source</h1>
            <Source />
          </div>
        </div>
      </section>
    </>
  );
}
