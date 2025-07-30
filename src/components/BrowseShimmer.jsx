const BrowseShimmer = () => {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Shimmer */}
      <div className="absolute inset-0 bg-gray-800 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      {/* Header Shimmer */}
      <header className="relative z-10 flex justify-between items-center px-8 py-6">
        <div className="w-24 h-8 bg-gray-700 rounded animate-pulse"></div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-700 rounded animate-pulse"></div>
          <div className="w-16 h-10 bg-gray-700 rounded animate-pulse"></div>
        </div>
      </header>

      {/* Hero Content Shimmer */}
      <div className="relative z-10 px-8 pt-16 pb-32">
        <div className="max-w-2xl">
          {/* Title Shimmer */}
          <div className="mb-6">
            <div className="w-96 h-16 bg-gray-700 rounded mb-4 animate-pulse"></div>
          </div>

          {/* Description Shimmer */}
          <div className="mb-8 space-y-3">
            <div className="w-full h-4 bg-gray-700 rounded animate-pulse"></div>
            <div className="w-full h-4 bg-gray-700 rounded animate-pulse"></div>
            <div className="w-full h-4 bg-gray-700 rounded animate-pulse"></div>
            <div className="w-4/5 h-4 bg-gray-700 rounded animate-pulse"></div>
            <div className="w-full h-4 bg-gray-700 rounded animate-pulse"></div>
            <div className="w-3/4 h-4 bg-gray-700 rounded animate-pulse"></div>
          </div>

          {/* Buttons Shimmer */}
          <div className="flex gap-4">
            <div className="w-32 h-14 bg-gray-700 rounded animate-pulse"></div>
            <div className="w-40 h-14 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Movie Row Shimmer */}
      <div className="relative z-10 px-8 pb-8">
        <div className="w-12 h-8 bg-gray-700 rounded mb-4 animate-pulse"></div>
        <div className="flex gap-2 overflow-hidden">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-48 h-28 bg-gray-700 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>

      {/* Back Button Shimmer */}
      <div className="absolute top-24 left-8 z-20 w-12 h-12 bg-gray-700 rounded-full animate-pulse"></div>
    </div>
  );
};

export default BrowseShimmer;
