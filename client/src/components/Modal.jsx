/* eslint-disable react/prop-types */


export default function Modal({ proceed, notice, abort, abortFunction, proceedFunction }) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-white w-full max-w-md">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">{notice}</h2>
          </div>
          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg mr-2 focus:outline-none"
              onClick={proceedFunction}
            >
              {proceed}
            </button>
            <button
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg focus:outline-none"
              onClick={abortFunction} // Replace with actual abort action
            >
              {abort}
            </button>
          </div>
        </div>
      </div>
    );
  }
  
