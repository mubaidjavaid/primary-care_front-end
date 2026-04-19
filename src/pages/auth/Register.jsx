import RegisterForm from "../../components/auth/RegisterForm";

export default function Register() {
  return (
    <div className="grid min-h-[70vh] place-items-center">
      <div className="w-full max-w-xl">
        <RegisterForm />
      </div>
    </div>
  );
}
