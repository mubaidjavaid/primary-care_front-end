import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Spinner from "../ui/Spinner";

export default function LoginForm() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await signIn(
        form.email.trim().toLowerCase(),
        form.password.trim(),
      );
      const role = data?.user?.role;
      if (role === "superadmin") {
        navigate("/superadmin");
      } else if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/triage");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="card w-full max-w-lg p-8">
      <h1 className="font-display text-4xl">Welcome back</h1>
      <p className="mt-2 text-sm text-medical-muted">
        Sign in to continue triage sessions
      </p>

      <label className="mt-6 block text-sm font-medium text-slate-700">
        Email
      </label>
      <div className="relative mt-1">
        <Mail size={16} className="absolute left-3 top-3 text-medical-muted" />
        <input
          className="input-field pl-9"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
      </div>

      <label className="mt-4 block text-sm font-medium text-slate-700">
        Password
      </label>
      <div className="relative mt-1">
        <Lock size={16} className="absolute left-3 top-3 text-medical-muted" />
        <input
          className="input-field pl-9 pr-9"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button
          type="button"
          className="absolute right-3 top-2.5 text-slate-500"
          onClick={() => setShowPassword((v) => !v)}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.remember}
            onChange={(e) => setForm({ ...form, remember: e.target.checked })}
          />{" "}
          Remember me
        </label>
        <Link to="/forgot" className="text-navy-700 hover:underline">
          Forgot password?
        </Link>
      </div>

      <p className="mt-3 text-sm text-slate-600">
        New user?{" "}
        <Link to="/register" className="text-navy-700 hover:underline">
          Create account
        </Link>
      </p>

      <button
        type="submit"
        className="btn-primary mt-6 w-full justify-center"
        disabled={loading}
      >
        {loading ? <Spinner label="Signing in..." /> : "Sign In"}
      </button>
      {error && (
        <p className="mt-3 rounded-input border border-emergency-border bg-emergency-bg p-2 text-sm text-emergency-text">
          {error}
        </p>
      )}
    </form>
  );
}
