import { Link } from "react-router-dom";

const ListCard = ({ medias, name, link }: any) => {
  console.log(medias);

  return (
    <div className="flex items-center space-x-4">
      <Link to={link} className="relative w-56 h-32 md:h-48">
        {[0, 1, 2, 3].reverse().map((item, index) =>
          medias[index] ? (
            <div
              className={`absolute w-24 h-32 md:w-32 md:h-48 border border-gray-600 rounded-md overflow-hidden shadow-2xl`}
              style={{ left: `${index * 30}px`, zIndex: item }}
            >
              <img
                src={`http://image.tmdb.org/t/p/w500/${medias[index].poster_path}`}
                alt=""
                className="w-full h-full"
              />
            </div>
          ) : (
            <div
              className={`absolute w-24 h-32 md:w-32 md:h-48 bg-gray-800 border border-gray-600 rounded-md overflow-hidden shadow-2xl`}
              style={{ left: `${index * 30}px`, zIndex: item }}
            ></div>
          ),
        )}
      </Link>
      <div>
        <Link to={link} className="text-2xl font-semibold">
          {name}
        </Link>
        <p className="text-gray-400">{medias.length} medias</p>
      </div>
    </div>
  );
};

export default ListCard;
