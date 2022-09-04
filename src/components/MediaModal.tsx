import { useState } from "react";
import { AiOutlineMore } from "react-icons/ai";
import { Dialog } from "@headlessui/react";
import { useQuery } from "react-query";
import { useAuth } from "../contexts/AuthContext";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import { IList } from "../types/IList";
import { BsPlus } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  movieTitle?: string;
  movieId?: string;
  mediaType?: string;
  posterPath?: string;
}

const MediaModal = ({ movieTitle, movieId, mediaType, posterPath }: Props) => {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedLists, setSelectedLists] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const { data, isLoading } = useQuery<IList[]>(["lists", currentUser?.uid], async () => {
    const q = query(collection(db, "lists"), where("userId", "==", currentUser?.uid));
    const querySnapshot = await getDocs(q);
    const lists = querySnapshot.docs.map((doc) => {
      const data = doc.data() as Omit<IList, "id">;
      return { id: doc.id, ...data };
    });
    return lists;
  });
  const publicLists = data?.filter((list) => list.public);
  const privateLists = data?.filter((list) => list.public === false);
  const navigate = useNavigate();

  const handleListSelection = (listId: string) => {
    if (selectedLists.includes(listId)) {
      setSelectedLists(selectedLists.filter((id) => id !== listId));
    } else {
      setSelectedLists([...selectedLists, listId]);
    }
  };

  const handleAddToSelectedLists = async () => {
    setIsAdding(true);
    for (const listId of selectedLists) {
      const docRef = doc(db, "lists", listId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const list = docSnap.data() as IList;
        const newMedia = [...list.medias, { mediaType, mediaId: movieId, posterPath }];
        await updateDoc(docRef, { medias: newMedia });
      }
    }
    navigate("/profile");
  };

  const tabs = [
    <div className="flex flex-col gap-2">
      {publicLists?.map((list) => (
        <label
          className="hover:bg-gray-800 p-2 rounded-md cursor-pointer flex items-center gap-2"
          htmlFor={list.id}
        >
          <input
            id={list.id}
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={selectedLists.includes(list.id)}
            onChange={() => handleListSelection(list.id)}
          />
          <div className="flex justify-between flex-1">
            <h3>{list.name}</h3>
            <p>{list.medias.length} medias</p>
          </div>
        </label>
      ))}
    </div>,
    <div className="flex flex-col gap-2">
      {privateLists?.map((list) => (
        <label
          className="hover:bg-gray-800 p-2 rounded-md cursor-pointer flex items-center gap-2"
          htmlFor={list.id}
        >
          <input
            id={list.id}
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={selectedLists.includes(list.id)}
            onChange={() => handleListSelection(list.id)}
          />
          <div className="flex justify-between flex-1">
            <h3>{list.name}</h3>
            <p>{list.medias.length} medias</p>
          </div>
        </label>
      ))}
    </div>,
  ];

  return (
    <>
      <button className="btn btn-circle btn-ghost" onClick={() => setIsOpen(true)}>
        <AiOutlineMore className="text-3xl" />
      </button>
      <Dialog
        as="div"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 bg-black bg-opacity-80 z-50"
      >
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel as="div" className="modal-box relative">
            <Dialog.Title className="text-2xl font-semibold">
              Add '{movieTitle}' to lists
            </Dialog.Title>
            <div className="tabs tabs-boxed max-w-sm mx-auto my-4 flex justify-center">
              <button
                className={`tab tab-lg flex-1 ${currentTab === 0 && "tab-active"}`}
                onClick={() => setCurrentTab(0)}
              >
                Public
              </button>
              <button
                className={`tab tab-lg flex-1 ${currentTab === 1 && "tab-active"}`}
                onClick={() => setCurrentTab(1)}
              >
                Private
              </button>
            </div>
            <Link
              to="/profile/new-list"
              className="flex items-center my-4 p-2 text-gray-300 hover:text-white"
            >
              <BsPlus className="h-6 w-6" />
              <span>New list...</span>
            </Link>

            {!isLoading && tabs[currentTab]}

            <div className="mt-5 p-2 flex items-center justify-between">
              <p>{selectedLists.length} lists selected</p>
              <button
                className={`btn btn-primary ${isAdding && "loading"}`}
                onClick={() => handleAddToSelectedLists()}
                disabled={selectedLists.length === 0 || isAdding}
              >
                Add
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MediaModal;
