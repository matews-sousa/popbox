import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Container from "../components/Container";
import InputText from "../components/InputText";
import { useAuth } from "../contexts/AuthContext";
import updateUserDoc from "../utils/updateUserDoc";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email().min(1, { message: "Email is required." }),
});

const Profile = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    if (!currentUser) return;

    try {
      updateProfile(currentUser, {
        displayName: data.name,
      });
      updateUserDoc(currentUser.uid, {
        displayName: data.name,
      });
      setCurrentUser({
        ...currentUser,
        displayName: data.name,
      });
    } catch (error) {
      console.log(error);
    }
  };

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
    setValue("name", currentUser?.displayName);
    setValue("email", currentUser?.email);
  }, []);

  return (
    <Container>
      <div className="pt-32">
        <div className="flex items-center space-x-4">
          {avatar}
          <div>
            <h1 className="text-2xl font-bold">{currentUser?.displayName}</h1>
            <p className="text-gray-600">{currentUser?.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText label="Name" name="name" register={register} error={errors} />
          <InputText label="Email" name="email" register={register} error={errors} />
          <button className="btn">Update</button>
        </form>
      </div>
    </Container>
  );
};

export default Profile;
