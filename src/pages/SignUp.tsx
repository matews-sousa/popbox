import InputText from "../components/InputText";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";

const schema = z
  .object({
    email: z.string().email().min(1, { message: "Email is required." }),
    password: z.string().min(6, { message: "Password must have at least 6 characters." }),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords must match.",
    path: ["confirm"],
  });

const SignUp = () => {
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
          <h2 className="card-title mx-auto">Sign Up</h2>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
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
