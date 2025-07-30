import { useEffect, useState } from "react";
import Header from "./Header";
import { BACKGROUND_IMAGE, TMDB_IMAGES } from "../utils/contants";
import Carrousel from "./Carrousel";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLibrary } from "../utils/moviesSlice";

const Browse = () => {
  const { library, lastFetched } = useSelector((store) => store.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sections = ["all", "movie", "tv"];
  const featuredMovie = library?.movie?.[0] || {
    title: "Stranger Things",
    overview:
      "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    poster_path: BACKGROUND_IMAGE,
  };

  const fetchLibrary = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGM0MWRkZGQ4MzMwZDE5MzAyZjAwY2JiZTM0NTU5ZSIsIm5iZiI6MTc1MzgyMTE3OS4yNjU5OTk4LCJzdWIiOiI2ODg5MmZmYjcyMWZmNTJhOTFlMTM2ZWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ASnol3tUnex3OCkbtnSSLLXByxG61pEEG_oKZDL4nfA",
      },
    };
    const lib = {};
    for (const section of sections) {
      const data = await fetch(
        `https://api.themoviedb.org/3/trending/${section}/day?language=en-US`,
        options
      );
      const json = await data.json();
      lib[section] = json.results;
    }

    dispatch(setLibrary(lib));
  };

  useEffect(() => {
    if (!lastFetched) {
      fetchLibrary();
    }
    return () => {
      console.log("UNMOUNTING");
    };
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <Header />

      {/* Hero Section */}
      <div className="relative h-screen">
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
            </div>
          </div>
        </div>
      </div>
      <div className="-mt-32">
        {library &&
          Object.entries(library).map(
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
