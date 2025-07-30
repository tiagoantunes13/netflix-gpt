import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { TMDB_IMAGES } from "../utils/contants";
import { removeFavorite } from "../utils/favoritesSlice";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const favMovies = useSelector((store) => store.favorites.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen">
      <Header />

      {/* Page Header */}
      <div className="px-8 md:px-16 pt-24 pb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          My Favorites
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Your collection of favorite movies
        </p>

        {/* Stats Bar */}
        <div className="flex items-center space-x-8 mb-8">
          <div className="text-gray-300">
            <span className="text-2xl font-bold text-white">
              {favMovies.length}
            </span>
            <span className="ml-2">Movies</span>
          </div>
          <div className="text-gray-300">
            <span className="text-2xl font-bold text-white">
              {Math.floor(
                favMovies.reduce(
                  (acc, movie) => acc + (movie.runtime || 120),
                  0
                ) / 60
              )}
              h
            </span>
            <span className="ml-2">Total Runtime</span>
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="px-8 md:px-16 pb-16">
        {favMovies.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-400 text-center max-w-md mb-8">
              Start exploring movies and add them to your favorites to see them
              here
            </p>
            <button
              className="bg-red-600 text-white px-8 py-3 rounded font-bold hover:bg-red-700 transition-colors"
              onClick={() => {
                navigate("/browse");
              }}
            >
              Browse Movies
            </button>
          </div>
        ) : (
          /* Movies Grid */
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {favMovies.map((movie) => (
              <div
                key={movie.id}
                className="group cursor-pointer transition-transform hover:scale-105 duration-300"
              >
                <div className="relative">
                  <img
                    src={TMDB_IMAGES + "w300" + movie.poster_path}
                    alt={movie.title}
                    className="w-full rounded-lg shadow-lg"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 rounded-lg flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                      <button className="bg-white text-black px-4 py-2 rounded-full mb-2 font-semibold hover:bg-gray-200 transition-colors flex items-center mx-auto">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                        Play
                      </button>

                      {/* Remove from favorites button */}
                      <button
                        className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                        onClick={() => {
                          dispatch(removeFavorite(movie));
                        }}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm font-bold">
                    ⭐ {movie.vote_average?.toFixed(1)}
                  </div>
                </div>

                {/* Movie Info */}
                <div className="mt-3">
                  <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2 group-hover:text-gray-300 transition-colors">
                    {movie.title}
                  </h3>
                  <p className="text-gray-400 text-xs">
                    {new Date(movie.release_date).getFullYear()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
