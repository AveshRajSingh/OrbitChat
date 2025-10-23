import { AlertTriangle } from "lucide-react";

const Error = ({ message = "Something went wrong. Please try again!" }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50 animate-fadeIn">
      <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
        <AlertTriangle className="text-red-500 w-8 h-8" />
      </div>
      <h2 className="text-2xl font-semibold text-red-600 mb-2">Error</h2>
      <p className="text-gray-700 text-center max-w-sm">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
      >
        Retry
      </button>
    </div>
  );
};

export default Error;
