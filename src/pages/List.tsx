import Card from "../components/Card";
import Container from "../components/Container";
import { useAuth } from "../contexts/AuthContext";
import api from "../lib/api";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useEffect, useState } from "react";
import { IList } from "../types/IList";
import { IMedia } from "../types/IMedia";

const List = () => {
  const { currentUser } = useAuth();
  const { id } = useParams();
  const [list, setList] = useState<IList | null>(null);
  const [medias, setMedias] = useState<IMedia[]>([]);

  useEffect(() => {
    if (!currentUser || !id) return;
    const fetchList = async () => {
      const docRef = doc(db, "lists", id);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data() as IList;
      setList(data);
    };
    fetchList();
  }, []);

  useEffect(() => {
    const fetchMedias = async () => {
      if (!currentUser || !list?.medias) return;
      const medias = list.medias.map(async (media) => {
        const { data } = await api.get(`/${media.mediaType}/${media.mediaId}`);
        return data;
      });
      const finalMedias = await Promise.all(medias);
      setMedias(finalMedias);
    };
    fetchMedias();
  }, [list]);

  return (
    <Container>
      <div className="pt-32">
        <h1 className="text-3xl font-bold text-center mb-6">{list?.name}</h1>
        {medias && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {medias?.map((media, index) => (
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

export default List;
