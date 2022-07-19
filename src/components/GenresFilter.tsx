interface Props {
  genres: {
    id: number;
    name: string;
  }[];
  selectedGenres: number[];
  handleGenreClick: (id: number) => void;
}

const GenresFilter = ({ genres, selectedGenres, handleGenreClick }: Props) => {
  return (
    <div className="flex gap-2 flex-wrap justify-center mb-4">
      {genres.map((genre: { id: number; name: string }) => (
        <button
          key={genre.id}
          className={`${
            selectedGenres.includes(genre.id)
              ? "bg-red-500 shadow-red-500"
              : "bg-gray-600  shadow-black"
          } rounded-full px-3 py-1 shadow-sm font-medium text-sm`}
          onClick={() => handleGenreClick(genre.id)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenresFilter;
