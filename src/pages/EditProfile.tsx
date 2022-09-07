import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import Container from "../components/Container";
import InputText from "../components/InputText";
import { useAuth } from "../contexts/AuthContext";
import updateUserDoc from "../utils/updateUserDoc";
import { z } from "zod";
import getUserByUsername from "../utils/getUserByUsername";
import { useQuery } from "react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const schema = z.object({
  username: z
    .string()
    .min(3, "Username must have at least 3 characters")
    .max(20)
    .transform((value) => value.toLowerCase().replace(/\s/g, ""))
    .refine(
      async (value) => {
        const usernameAlreadyExists = await getUserByUsername(value);
        return !usernameAlreadyExists;
      },
      {
        message: "Username already in use",
      },
    ),
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email().min(1, { message: "Email is required" }),
});

const EditProfile = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const { username } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    if (!currentUser) return;

    try {
      updateProfile(currentUser, {
        displayName: data.name,
      });
      updateUserDoc(currentUser.uid, {
        username: data.username,
        displayName: data.name,
      });
      setCurrentUser({
        ...currentUser,
        username: data.username,
        displayName: data.name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const formUsername = watch("username");
  useEffect(() => {
    setValue("username", formUsername?.toLowerCase().replace(/\s/g, ""));
  }, [formUsername]);

  useEffect(() => {
    if (currentUser?.username !== username) navigate("/");

    setValue("username", currentUser?.username);
    setValue("name", currentUser?.displayName);
    setValue("email", currentUser?.email);
  }, []);

  return (
    <Container>
      <div className="pt-32">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText label="Username" name="username" register={register} error={errors} />
          <InputText label="Name" name="name" register={register} error={errors} />
          <InputText label="Email" name="email" register={register} error={errors} />
          <button className="btn">Update</button>
        </form>
      </div>
    </Container>
  );
};

export default EditProfile;
