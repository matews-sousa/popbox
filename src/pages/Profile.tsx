import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import Container from "../components/Container";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import ListCard from "../components/ListCard";
import { IList } from "../types/IList";
import { useEffect, useState } from "react";
import getUserList from "../utils/getUserList";
import getUserByUsername from "../utils/getUserByUsername";
import { IUser } from "../types/IUser";

const Profile = () => {
  const { currentUser } = useAuth();
  const { username } = useParams();
  const {
    data: profile,
    isLoading: isLoadingProfile,
    isError,
  } = useQuery<IUser>([username, username], async () => {
    const user = (await getUserByUsername(username as string)) as IUser;
    return user;
  });
  const {
    data: lists,
    isLoading: isLoadingLists,
    isError: isErrorLists,
  } = useQuery([`${username}-lists`, profile?.uid], async () => {
    if (!profile) return [];
    const q = query(collection(db, "lists"), where("userId", "==", profile.uid));
    const querySnapshot = await getDocs(q);
    const lists = querySnapshot.docs.map((doc) => {
      const data = doc.data() as Omit<IList, "id">;
      return { id: doc.id, ...data };
    });
    return lists;
  });
  const [favorites, setFavorites] = useState<{ mediaId: string; mediaType: string }[]>([]);
  const [watched, setWatched] = useState<{ mediaId: string; mediaType: string }[]>([]);

  const avatar = profile?.photoURL ? (
    <div className="avatar">
      <div className="w-20 md:w-24 rounded-full">
        <img src={profile?.photoURL} />
      </div>
    </div>
  ) : (
    <div className="avatar placeholder">
      <div className="bg-neutral-focus text-neutral-content rounded-full w-20 md:w-24">
        <span className="text-3xl">{profile?.username?.charAt(0).toUpperCase()}</span>
      </div>
    </div>
  );

  useEffect(() => {
    if (!profile) return;
    const fetchFavsAndWatched = async () => {
      const favs = await getUserList(profile.uid, "favorites");
      const watches = await getUserList(profile.uid, "watched");
      setFavorites(favs);
      setWatched(watches);
    };
    fetchFavsAndWatched();
  }, []);

  if (isLoadingProfile || isLoadingLists) return <Container>Loading...</Container>;

  return (
    <Container>
      <div className="pt-32">
        <div className="flex items-center space-x-2">
          {avatar}
          <div className="space-y-2">
            <h1 className="text-lg md:text-2xl font-bold">{profile?.username}</h1>
            {currentUser?.uid === profile?.uid && (
              <Link to="edit" className="btn btn-primary btn-sm">
                Edit Profile
              </Link>
            )}
          </div>
        </div>

        <ul className="flex space-x-5 mt-5 text-xs text-center md:text-base">
          <li>
            <Link to="movie/favorites" className="flex flex-col items-center  group">
              <p>{favorites.filter((fav) => fav.mediaType === "movie").length}</p>
              <p className="text-gray-500 group-hover:text-gray-100">Favorites movies</p>
            </Link>
          </li>
          <div className="divider divider-horizontal"></div>
          <li>
            <Link to="movie/watched" className="flex flex-col items-center group">
              <p>{watched.filter((watch) => watch.mediaType === "movie").length}</p>
              <p className="text-gray-500 group-hover:text-gray-100">Watched movies</p>
            </Link>
          </li>
          <div className="divider divider-horizontal"></div>
          <li>
            <Link to="tv/favorites" className="flex flex-col items-center group">
              <p>{favorites.filter((fav) => fav.mediaType === "tv").length}</p>
              <p className="text-gray-500 group-hover:text-gray-100">Favorites TV</p>
            </Link>
          </li>
          <div className="divider divider-horizontal"></div>
          <li>
            <Link to="tv/watched" className="flex flex-col items-center group">
              <p>{watched.filter((watch) => watch.mediaType === "tv").length}</p>
              <p className="text-gray-500 group-hover:text-gray-100">Watched TV</p>
            </Link>
          </li>
        </ul>

        <div className="flex items-center justify-between">
          <h3 className="mt-8 mb-4 text-3xl">All Lists</h3>

          <Link to="/new-list" className="btn normal-case">
            Start a new list
          </Link>
        </div>

        <div className="space-y-4">
          {lists?.map((list) => (
            <ListCard
              key={list.id}
              id={list.id}
              medias={list.medias}
              name={list.name}
              isPublic={list.public}
              link={`/${profile?.username}/list/${list.id}`}
              authorId={list.userId}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Profile;
