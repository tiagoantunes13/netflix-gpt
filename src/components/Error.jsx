const Error = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Netflix Logo */}
        <div className="mb-8">
          <img
            src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-24/consent/87b6a5c0-0104-4e96-a291-092c11350111/019808e2-d1a7-75a7-a8b7-f85133e4c823/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
            alt="Netflix"
            className="w-32 mx-auto mb-8"
          />
        </div>

        {/* Error Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-red-600 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        </div>

        {/* Error Content */}
        <div className="text-white mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Oops!</h1>
          <h2 className="text-xl md:text-2xl font-medium mb-4 text-gray-300">
            Something went wrong
          </h2>
          <p className="text-gray-400 text-lg mb-2">
            We're having trouble loading this page.
          </p>
          <p className="text-gray-400 text-base">
            Please check your internet connection and try again.
          </p>
        </div>

        {/* Error Code */}
        <div className="mb-8">
          <span className="bg-gray-800 text-gray-300 px-4 py-2 rounded text-sm font-mono">
            Error Code: NW-2-5
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <button
            onClick={handleRetry}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={handleGoHome}
            className="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white font-semibold px-8 py-3 rounded transition-colors"
          >
            Go to Home
          </button>
        </div>

        {/* Help Link */}
        <div className="mt-8 text-gray-500">
          <p className="text-sm">
            Still having trouble?{" "}
            <a href="#" className="text-red-500 hover:text-red-400 underline">
              Visit our Help Center
            </a>
          </p>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-gray-600 text-xs">
          <p>Netflix Error Page</p>
        </div>
      </div>
    </div>
  );
};

export default Error;
