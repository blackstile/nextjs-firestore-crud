import React from 'react';

function Loading({ classname }) {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="flex items-center justify-center w-14 h-14 border-4 border-violet-400 rounded-full border-r-neutral-50 animate-spin">
        <div className="w-8 h-8 border-4 border-sky-300 rounded-full border-l-neutral-100 animate-spin"></div>
      </div>
      <p className="text-xl animate-pulse text-violet-900 my-4">Carregando</p>
    </div>
  );
}

export default Loading;
