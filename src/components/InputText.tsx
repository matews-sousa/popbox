interface Props {
  label: string;
  name: string;
  type?: "text" | "password" | "email";
  register?: any;
  error?: any;
}

const InputText = ({ label, name, type = "text", register, error }: Props) => {
  return (
    <div className="form-control w-full">
      <label className="label" htmlFor={name}>
        <span className="label-text-alt">{label}</span>
      </label>
      <input
        type={type}
        className={`input input-sm input-bordered w-full ${error[name]?.message && "input-error"}`}
        id="password"
        {...register(name)}
      />
      {error && (
        <label className="label">
          <span className="label-text-alt text-red-400">{error[name]?.message}</span>
        </label>
      )}
    </div>
  );
};

export default InputText;
