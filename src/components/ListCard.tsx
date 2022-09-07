import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import { useAuth } from "../contexts/AuthContext";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase";

interface Props {
  id: string;
  medias: {
    mediaType: string;
    mediaId: string;
    posterPath: string;
  }[];
  name: string;
  isPublic: boolean;
  link: string;
  authorId: string;
}

const ListCard = ({ id, medias, name, isPublic, link, authorId }: Props) => {
  const { currentUser } = useAuth();
  const isOwner = currentUser?.uid === authorId;

  const deleteList = async () => {
    if (!isOwner) return;
    try {
      const docRef = doc(db, "lists", id);
      await deleteDoc(docRef);
      console.log("deleted?");
    } catch (error) {
      console.log(error);
    }
  };

  if (!currentUser || (!isPublic && !isOwner)) return null;

  return (
    <div className="flex items-center space-x-4">
      <Link to={link} className="relative w-56 h-32 md:h-48">
        {[0, 1, 2, 3].reverse().map((item, index) =>
          medias[index] ? (
            <div
              className={`absolute w-20 h-28 md:w-32 md:h-48 border border-gray-600 rounded-md overflow-hidden shadow-2xl`}
              style={{ left: `${index * 30}px`, zIndex: item }}
              key={medias[index].mediaId}
            >
              <img
                src={`http://image.tmdb.org/t/p/w500/${medias[index].posterPath}`}
                alt=""
                className="w-full h-full"
              />
            </div>
          ) : (
            <div
              className={`absolute w-20 h-28 md:w-32 md:h-48 bg-gray-800 border border-gray-600 rounded-md overflow-hidden shadow-2xl`}
              style={{ left: `${index * 30}px`, zIndex: item }}
              key={index}
            ></div>
          ),
        )}
      </Link>
      <div>
        <Link to={link} className="text-xl md:text-2xl font-semibold">
          {name}
        </Link>
        <div className="flex space-x-2 items-center text-sm md:text-base">
          <p className="text-gray-400">{medias.length} medias</p>
          <div className="badge">{isPublic ? "Public" : "Private"}</div>
        </div>
        {isOwner && (
          <div className="space-x-2">
            <button className="btn btn-primary btn-square btn-sm">
              <MdEdit className="h-4 w-4" />
            </button>
            <button className="btn btn-error btn-square btn-sm" onClick={deleteList}>
              <MdDelete className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListCard;
