import MovieCarrousel from "./MovieCarrousel";

const Carrousel = ({ library, section }) => {
  return (
    <div className="relative z-20 px-8 md:px-16 pb-20">
      <h2 className="text-white text-2xl font-bold mb-4">{section}</h2>
      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
        {library.map((movie) => (
          <MovieCarrousel key={movie.id} movie={movie} size="w1280" />
        ))}
      </div>
    </div>
  );
};

export default Carrousel;
