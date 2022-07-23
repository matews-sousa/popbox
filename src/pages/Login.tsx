import InputText from "../components/InputText";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";

const schema = z.object({
  email: z.string().email().min(1, { message: "Email is required." }),
  password: z.string().min(6, { message: "Password must have at least 6 characters." }),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <div className="card w-96 bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title mx-auto">Login</h2>
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
