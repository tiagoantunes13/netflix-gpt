import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import { TMDB_IMAGES } from "../utils/contants";

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();

  const fetchMovie = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGM0MWRkZGQ4MzMwZDE5MzAyZjAwY2JiZTM0NTU5ZSIsIm5iZiI6MTc1MzgyMTE3OS4yNjU5OTk4LCJzdWIiOiI2ODg5MmZmYjcyMWZmNTJhOTFlMTM2ZWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ASnol3tUnex3OCkbtnSSLLXByxG61pEEG_oKZDL4nfA",
      },
    };
    const data = await fetch(`https://api.themoviedb.org/3/tv/${id}`, options);
    const json = await data.json();
    setMovie(json);
  };

  console.log(movie);

  useEffect(() => {
    fetchMovie();
  }, []);

  if (!movie) {
    return <div>LOADING</div>;
  }

  return (
    <div className="bg-black min-h-screen">
      <Header />

      {/* Hero Section */}
      <div className="relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${
              TMDB_IMAGES + "original" + movie.poster_path
            })`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/10 to-transparent"></div>
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div> */}
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/browse")}
          className="absolute top-24 left-8 z-20 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>

        {/* Movie Details */}
        <div className="relative z-10 flex items-center h-full px-8 md:px-16">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              {movie.title}
            </h1>

            {/* Movie Meta Info */}
            <div className="flex items-center space-x-4 text-white mb-6">
              <span className="text-green-400 font-semibold">98% Match</span>
              <span className="border border-gray-400 px-2 py-1 text-sm">
                {movie.vote_average}
              </span>
              <span>{movie.vote_count}</span>
              <span>{movie.vote_count}</span>
            </div>

            {/* Genres */}
            {/* <div className="flex flex-wrap gap-2 mb-6">
              {movie.genre.map((genre, index) => (
                <span key={index} className="text-gray-300 text-sm">
                  {genre}
                  {index < movie.genre.length - 1 && " • "}
                </span>
              ))}
            </div> */}

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              {movie.overview}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
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
              <button className="bg-gray-600 bg-opacity-70 text-white px-8 py-3 rounded font-bold text-lg hover:bg-opacity-90 transition-all flex items-center">
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                My List
              </button>
              <button className="bg-gray-600 bg-opacity-70 text-white p-3 rounded-full hover:bg-opacity-90 transition-all">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
              </button>
              <button className="bg-gray-600 bg-opacity-70 text-white p-3 rounded-full hover:bg-opacity-90 transition-all">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details Section */}
      {/* <div className="relative z-20 -mt-32 px-8 md:px-16 pb-20">
        <div className="bg-gray-900 rounded-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-white text-xl font-bold mb-4">Cast</h3>
              <p className="text-gray-300 mb-6">{movie.cast.join(", ")}</p>

              <h3 className="text-white text-xl font-bold mb-4">Director</h3>
              <p className="text-gray-300">{movie.director}</p>
            </div>

            <div>
              <h3 className="text-white text-xl font-bold mb-4">Genres</h3>
              <p className="text-gray-300 mb-6">{movie.genre.join(", ")}</p>

              <h3 className="text-white text-xl font-bold mb-4">
                This movie is
              </h3>
              <div className="flex flex-wrap gap-2">
                {movie.genre.map((genre, index) => (
                  <span
                    key={index}
                    className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Movie;
