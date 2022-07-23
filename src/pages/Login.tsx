import InputText from "../components/InputText";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

const schema = z.object({
  email: z.string().email().min(1, { message: "Email is required." }),
  password: z.string().min(6, { message: "Password must have at least 6 characters." }),
});

const Login = () => {
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    try {
      await signIn(data.email, data.password);
      navigate("/");
    } catch (error: any) {
      switch (error.code) {
        case "auth/user-not-found":
          setError("User not found.");
          break;
        case "auth/wrong-password":
          setError("Wrong password.");
          break;
        default:
          setError("Unknown error.");
          break;
      }
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <div className="card w-96 bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title mx-auto">Login</h2>
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
            <InputText label="Email" name="email" register={register} error={errors} />
            <InputText
              label="Password"
              name="password"
              type="password"
              register={register}
              error={errors}
            />
            <button className="btn btn-accent w-full mt-4">Login</button>
          </form>
        </div>
      </div>
      <p className="mt-4">
        <span>Don't have an account yet? </span>
        <Link to="/signup" className="link link-accent">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
