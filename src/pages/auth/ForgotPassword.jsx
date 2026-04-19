import { Link } from "react-router-dom";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";

export default function ForgotPassword() {
  return (
    <div className="grid min-h-[70vh] place-items-center">
      <div className="w-full max-w-md space-y-4">
        <Link className="text-sm text-navy-700 hover:underline" to="/login">
          ← Back to login
        </Link>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
