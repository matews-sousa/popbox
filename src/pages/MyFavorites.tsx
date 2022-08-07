import { useQuery } from "react-query";
import Card from "../components/Card";
import Container from "../components/Container";
import { useAuth } from "../contexts/AuthContext";
import api from "../lib/api";
import getUserFavorites from "../utils/getUserFavorites";
import { motion } from "framer-motion";

const MyFavorites = () => {
  const { currentUser } = useAuth();
  const { data, isLoading, isError } = useQuery(["favorites", currentUser?.uid], async () => {
    if (!currentUser) return [];
    const favs = await getUserFavorites(currentUser.uid);
    const favorites = favs.map(async (fav) => {
      const { data } = await api.get(`/${fav.mediaType}/${fav.mediaId}`);
      return data;
    });
    const finalFavorites = await Promise.all(favorites);
    return finalFavorites;
  });

  console.log(data);

  return (
    <Container>
      <div className="pt-32">
        <h1 className="text-3xl font-bold text-center mb-6">My Favorites</h1>
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

export default MyFavorites;
