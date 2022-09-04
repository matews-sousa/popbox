import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import InputText from "../components/InputText";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../lib/firebase";

const NewList = () => {
  const { currentUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const docRef = await addDoc(collection(db, "lists"), {
        name: data.name,
        public: data.public,
        medias: [],
        userId: currentUser?.uid,
        createdAt: Timestamp.now(),
      });
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <div className="pt-32">
        <h1 className="text-3xl font-bold">New List</h1>
        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <InputText label="Name" name="name" register={register} error={errors} />
          <div className="form-control w-28">
            <label htmlFor="public" className="cursor-pointer label">
              <input
                type="checkbox"
                id="public"
                className="checkbox checkbox-primary"
                defaultChecked={true}
                {...register("public")}
              />
              <span className="label-text">Public list</span>
            </label>
          </div>
          <button
            className={`btn btn-primary normal-case ${isSubmitting && "loading"}`}
            disabled={isSubmitting}
          >
            Create
          </button>
        </form>
      </div>
    </Container>
  );
};

export default NewList;
