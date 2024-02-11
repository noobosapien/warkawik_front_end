import React from "react";

export default function Console() {
  return (
    <>
      <section className="dark:bg-slate-700 bg-slate-200 mt-12 sm:mt-24 rounded-xl">
        <div className="container flex flex-col mx-auto  pb-24 pt-24 justify-center items-center">
          <div className="flex flex-col -mt-48 lg:w-1/2 space-y-4 items-center">
            <h1 className="text-2xl font-bold text-center p-6 rounded-2xl bg-white dark:bg-slate-900">
              Console
            </h1>
          </div>
        </div>
      </section>
    </>
  );
}
