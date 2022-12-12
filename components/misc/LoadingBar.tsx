import React, { useState } from "react";

function LoadingBar() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex justify-center items-center gap-x-2 ">
        <div
          className="spinner-grow inline-block w-8 h-8 bg-orange-400 rounded-full opacity-0"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <div
          className="spinner-grow inline-block w-8 h-8 bg-orange-500 rounded-full opacity-0"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <div
          className="spinner-grow inline-block w-8 h-8 bg-orange-600 rounded-full opacity-0"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default LoadingBar;
