import { Link } from "react-router-dom";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";

export default function ResetPassword() {
  return (
    <div className="grid min-h-[70vh] place-items-center">
      <div className="w-full max-w-md space-y-4">
        <Link className="text-sm text-navy-700 hover:underline" to="/login">
          ← Back to login
        </Link>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
