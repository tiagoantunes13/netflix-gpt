import { useDispatch, useSelector } from "react-redux";
import {
  setLibrary,
  setFeaturedMovie,
  setLibraryArray,
} from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovies = () => {
  const { library, lastFetched, featuredMovie, libraryArray } = useSelector(
    (store) => store.movies
  );
  console.log("FIRST MOVIES");
  console.log(library);
  console.log(libraryArray);

  const dispatch = useDispatch();
  const sections = ["all", "movie", "tv"];

  const fetchLibrary = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}`,
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

    const mainMovie = lib.movie?.[0];

    const videoData = await fetch(
      `https://api.themoviedb.org/3/movie/${mainMovie?.id}/videos`,
      options
    );
    const videoJson = await videoData.json();
    console.log("ads");
    console.log(videoJson);
    console.log(lib);

    const enrichedMovies = lib.all?.map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      genre_ids: movie.genre_ids,
      release_date: movie.release_date || movie.first_air_date,
      vote_average: movie.vote_average,
      media_type: movie.media_type
    })) || [];

    dispatch(setLibraryArray(enrichedMovies));

    dispatch(setLibrary(lib));
    dispatch(
      setFeaturedMovie({
        id: mainMovie.id,
        title: mainMovie.title,
        overview: mainMovie.overview,
        trailer:
          videoJson.results.find((obj) => obj.name === "Official Trailer") ||
          videoJson.results[0],
        poster_path: mainMovie.poster_path,
      })
    );
  };

  useEffect(() => {
    console.log("in useEffect");
    if (!lastFetched) {
      console.log("in Fetch");

      fetchLibrary();
    }
    return () => {
      console.log("UNMOUNTING");
    };
  }, []);

  return { library, featuredMovie, libraryArray };
};

export default useMovies;
