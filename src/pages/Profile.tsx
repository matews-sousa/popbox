import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useAuth } from "../contexts/AuthContext";
import getUserFavorites from "../utils/getUserFavorites";
import { db } from "../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import ListCard from "../components/ListCard";
import { IList } from "../types/IList";
import getUserWatched from "../utils/getUserWatched";
import { useEffect, useState } from "react";

const Profile = () => {
  const { currentUser } = useAuth();
  const {
    data: lists,
    isLoading: isLoadingLists,
    isError: isErrorLists,
  } = useQuery(["lists", currentUser?.uid], async () => {
    if (!currentUser) return [];
    const q = query(collection(db, "lists"), where("userId", "==", currentUser.uid));
    const querySnapshot = await getDocs(q);
    const lists = querySnapshot.docs.map((doc) => {
      const data = doc.data() as Omit<IList, "id">;
      return { id: doc.id, ...data };
    });
    return lists;
  });
  const [favorites, setFavorites] = useState<{ mediaId: string; mediaType: string }[]>([]);
  const [watched, setWatched] = useState<{ mediaId: string; mediaType: string }[]>([]);

  const avatar = currentUser?.photoURL ? (
    <div className="avatar">
      <div className="w-24 rounded-full">
        <img src={currentUser?.photoURL} />
      </div>
    </div>
  ) : (
    <div className="avatar placeholder">
      <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
        <span className="text-3xl">{currentUser?.displayName?.charAt(0)}</span>
      </div>
    </div>
  );

  useEffect(() => {
    if (!currentUser) return;
    const fetchFavsAndWatched = async () => {
      const favs = await getUserFavorites(currentUser.uid);
      const watches = await getUserWatched(currentUser.uid);
      setFavorites(favs);
      setWatched(watches);
    };
    fetchFavsAndWatched();
  }, []);

  if (isLoadingLists) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div className="pt-32">
        <div className="flex items-center space-x-4">
          {avatar}
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{currentUser?.displayName}</h1>
            <p className="text-gray-500">{currentUser?.email}</p>
          </div>
          <Link to="/profile/edit" className="btn btn-primary">
            Edit Profile
          </Link>
        </div>

        <ul className="flex space-x-5 mt-5">
          <li>
            <Link to="my-favorites" className="flex flex-col items-center  group">
              <p>{favorites.filter((fav) => fav.mediaType === "movie").length}</p>
              <p className="text-gray-500 group-hover:text-gray-100">Favorites movies</p>
            </Link>
          </li>
          <div className="divider divider-horizontal"></div>
          <li>
            <Link to="my-favorites" className="flex flex-col items-center group">
              <p>{watched.filter((watch) => watch.mediaType === "movie").length}</p>
              <p className="text-gray-500 group-hover:text-gray-100">Watched movies</p>
            </Link>
          </li>
          <div className="divider divider-horizontal"></div>
          <li>
            <Link to="my-favorites" className="flex flex-col items-center group">
              <p>{favorites.filter((fav) => fav.mediaType === "tv").length}</p>
              <p className="text-gray-500 group-hover:text-gray-100">Favorites TV</p>
            </Link>
          </li>
          <div className="divider divider-horizontal"></div>
          <li>
            <Link to="my-favorites" className="flex flex-col items-center group">
              <p>{watched.filter((watch) => watch.mediaType === "tv").length}</p>
              <p className="text-gray-500 group-hover:text-gray-100">Watched TV</p>
            </Link>
          </li>
        </ul>

        <div className="flex items-center justify-between">
          <h3 className="mt-8 mb-4 text-3xl">All Lists</h3>

          <Link to="/profile/new-list" className="btn normal-case">
            Start a new list
          </Link>
        </div>

        <div className="space-y-4">
          {lists?.map((list) => (
            <ListCard
              key={list.id}
              medias={list.medias}
              name={list.name}
              link={`/profile/list/${list.id}`}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Profile;
