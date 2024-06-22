import React from "react";

export default function TaskModal({ children, title , desc, proceedFunction, abortFunction, proceedBtn, abortBtn, visible }) {
  if (!visible) return null;
  
    return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
        <div className="bg-[#2d3e50] rounded-lg shadow-lg p-6 text-white w-full max-w-md">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>

          <p>
            {desc}
          </p>

          {children}
          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg mr-2 focus:outline-none"
              onClick={abortFunction} 
            >
              {abortBtn}
            </button>
            <button
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg  focus:outline-none"
              onClick={proceedFunction}
            >
              {proceedBtn}
            </button>
          </div>
        </div>
      </div>
  );
}
