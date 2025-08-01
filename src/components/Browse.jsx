import Header from "./Header";
import { TMDB_IMAGES } from "../utils/contants";
import Carrousel from "./Carrousel";
import { useNavigate } from "react-router-dom";
import useMovies from "./useMovies";
import BrowseShimmer from "./BrowseShimmer";
import { useState } from "react";

const Browse = () => {
  const navigate = useNavigate();
  const { library, featuredMovie } = useMovies();
  const [video, setVideo] = useState();
  console.log(library);
  console.log(featuredMovie);

  if (!library) {
    return <BrowseShimmer />;
  }

  return (
    <div className="bg-black min-h-screen">
      <Header />

      {/* Hero Section */}

      <div className="relative h-screen">
        {video && featuredMovie.trailer ? (
          <div className="absolute inset-0">
            <iframe
              className="w-full h-full object-cover scale-150"
              src={`https://www.youtube.com/embed/${featuredMovie.trailer.key}?autoplay=1&mute=1&loop=1&start=60&end=80`}
              title={featuredMovie.name}
            />
          </div>
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${
                TMDB_IMAGES + "original" + featuredMovie.poster_path
              })`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          </div>
        )}

        {/* Hero Content */}
        <div className="relative z-10 flex items-center h-full px-8 md:px-16">
          <div className="max-w-lg">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              {featuredMovie.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              {featuredMovie.overview}
            </p>
            <div className="flex space-x-4">
              <button className="bg-white text-black px-8 py-3 rounded font-bold text-lg hover:bg-gray-200 transition-colors flex items-center">
                <svg
                  className="w-6 h-6 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                Play
              </button>
              <button
                className="bg-gray-600 bg-opacity-70 text-white px-8 py-3 rounded font-bold text-lg hover:bg-opacity-90 transition-all flex items-center"
                onClick={() => {
                  navigate(`/movie/${featuredMovie.id}`);
                }}
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                More Info
              </button>
              {featuredMovie.trailer && (
                <button
                  className="bg-gray-600 bg-opacity-70 text-white px-8 py-3 rounded font-bold text-lg hover:bg-opacity-90 transition-all flex items-center"
                  onClick={() => {
                    setVideo(!video);
                  }}
                >
                  {video ? "Image" : "Video"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="-mt-32">
        {Object.entries(library).map(
          ([section, data]) =>
            section && (
              <Carrousel key={section} library={data} section={section} />
            )
        )}
      </div>
    </div>
  );
};

export default Browse;
