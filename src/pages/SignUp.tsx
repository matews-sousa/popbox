import InputText from "../components/InputText";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import getUserByUsername from "../utils/getUserByUsername";

const schema = z
  .object({
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
    email: z.string().email().min(1, { message: "Email is required" }),
    password: z.string().min(6, { message: "Password must have at least 6 characters" }),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords must match.",
    path: ["confirm"],
  });

const SignUp = () => {
  const { signUp, currentUser } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    try {
      await signUp(data.username, data.email, data.password);
      navigate("/login");
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("Email already in use.");
          break;
        case "auth/invalid-email":
          setError("Invalid email.");
          break;
        case "auth/weak-password":
          setError("Password is too weak.");
          break;
        default:
          setError("Unknown error.");
          break;
      }
    }
  };

  const username = watch("username");
  useEffect(() => {
    setValue("username", username?.toLowerCase().replace(/\s/g, ""));
  }, [username]);

  if (currentUser) return <Navigate to="/" />;

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <div className="card w-96 bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title mx-auto">Sign Up</h2>
          {error && (
            <div className="alert alert-error shadow-lg">
              <div>
                <span>{error}</span>
              </div>
              <div className="flex-none">
                <button className="btn btn-circle btn-sm btn-ghost" onClick={() => setError("")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <InputText label="Username" name="username" register={register} error={errors} />
            <InputText label="Email" name="email" register={register} error={errors} />
            <InputText
              label="Password"
              name="password"
              type="password"
              register={register}
              error={errors}
            />
            <InputText
              label="Confirm Password"
              name="confirm"
              type="password"
              register={register}
              error={errors}
            />
            <button className="btn btn-accent w-full mt-4">Sign Up</button>
          </form>
        </div>
      </div>
      <p className="mt-4">
        <span>Already have an account? </span>
        <Link to="/login" className="link link-accent">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
