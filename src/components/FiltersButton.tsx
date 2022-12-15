import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { GoSettings } from "react-icons/go";

interface Props {
  genres?: {
    id: number;
    name: string;
  }[];
  selectedGenres: number[];
  handleSelect: (id: number) => void;
  clearSelection: () => void;
}

const FiltersButton = ({ genres, selectedGenres, handleSelect, clearSelection }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <button onClick={open} className="btn gap-2">
        Filters
        <GoSettings />
      </button>

      <Dialog as="div" className="z-10" onClose={close} open={isOpen}>
        <div className="fixed inset-0 bg-black/30 z-40" aria-hidden="true"></div>
        <div className="absolute inset-0 flex justify-center items-center">
          <Dialog.Panel as="div" className="modal-box p-0 z-50">
            <div className="flex justify-between items-center p-5 sticky top-0 inset-x-0 bg-gray-900 border-b border-gray-500 mb-4">
              <Dialog.Title className="font-bold text-xl text-center">Filters</Dialog.Title>
              <button className="btn btn-sm btn-circle" onClick={close}>
                X
              </button>
            </div>
            <ul className="px-5 mb-2">
              {genres?.map((genre) => (
                <li key={genre.id}>
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-4">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-lg"
                        checked={selectedGenres.includes(genre.id)}
                        onChange={() => handleSelect(genre.id)}
                      />
                      <span className="text-xl">{genre.name}</span>
                    </label>
                  </div>
                </li>
              ))}
            </ul>
            <div className="sticky inset-x-0 bottom-0 bg-gray-900 h-20 p-5 flex gap-2">
              <button className="btn flex-1" onClick={clearSelection}>
                Clear All
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default FiltersButton;
