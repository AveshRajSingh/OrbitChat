const Loader = () => {
  return (
    <div className=" bg-black flex flex-col items-center justify-center h-screen animate-fadeIn">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-t-transparent border-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-600 text-lg font-medium animate-pulse">
        Loading, please wait...
      </p>
    </div>
  );
};

export default Loader;
