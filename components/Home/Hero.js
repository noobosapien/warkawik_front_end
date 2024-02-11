import React from "react";

export default function Hero() {
  return (
    <>
      <section className="dark:bg-slate-700 bg-slate-200 mt-12 sm:mt-24 rounded-xl">
        <div className="container flex flex-col mx-auto  pb-24 pt-24 justify-center items-center">
          <div className="flex flex-col lg:w-1/2 space-y-4 items-center">
            <h1 className="text-4xl font-bold text-center">
              AI generated Pixel shaders
            </h1>

            <p className="mx-auto text-center text-slate-400">
              Define what comes to your mind as a prompt, genereate the pixel
              shader and add it your Game, Animation, or Website.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
