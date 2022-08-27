import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import Container from "../components/Container";
import InputText from "../components/InputText";
import { useAuth } from "../contexts/AuthContext";
import updateUserDoc from "../utils/updateUserDoc";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email().min(1, { message: "Email is required." }),
});

const EditProfile = () => {
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

  useEffect(() => {
    setValue("name", currentUser?.displayName);
    setValue("email", currentUser?.email);
  }, []);

  return (
    <Container>
      <div className="pt-32">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText label="Name" name="name" register={register} error={errors} />
          <InputText label="Email" name="email" register={register} error={errors} />
          <button className="btn">Update</button>
        </form>
      </div>
    </Container>
  );
};

export default EditProfile;
