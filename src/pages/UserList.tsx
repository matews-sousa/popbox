import { useQuery } from "react-query";
import Card from "../components/Card";
import Container from "../components/Container";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import getListFromIds from "../utils/getListFromIds";
import { useParams } from "react-router-dom";
import getUserList from "../utils/getUserList";
import getUserByUsername from "../utils/getUserByUsername";

const UserList = () => {
  const { currentUser } = useAuth();
  const { username, type, list } = useParams();
  const { data: profile } = useQuery(
    [username, username],
    async () => await getUserByUsername(username as string),
  );
  const { data, isLoading, isError } = useQuery(["favorites movies", profile?.uid], async () => {
    if (!profile) return [];
    const aux = await getUserList(profile.uid, list as "watched" | "favorites");
    const listFiltered = aux.filter((fav) => fav.mediaType === type);
    const finalList = await getListFromIds(listFiltered);
    return finalList;
  });
  const titleString = list === "favorites" ? "Favorites" : "Watched";

  return (
    <Container>
      <div className="pt-32">
        <h1 className="text-3xl font-bold text-center mb-6">
          {titleString} {type === "movie" ? "Movies" : "TV Series"}
        </h1>
        {data && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {data?.map((media, index) => (
              <motion.div
                key={media.id}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index / 30 }}
              >
                <Card data={media} type={media.original_title ? "movie" : "serie"} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default UserList;
