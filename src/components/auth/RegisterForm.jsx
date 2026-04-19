import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/auth.service";
import { useAuthStore } from "../../store/authStore";
import Spinner from "../ui/Spinner";

export default function RegisterForm() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password.trim(),
      };

      const { data } = await authService.publicRegister(payload);
      login(data.user, data.accessToken);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="card w-full max-w-lg p-8">
      <h1 className="font-display text-4xl">Create account</h1>
      <p className="mt-2 text-sm text-medical-muted">
        Register as a doctor to start triage sessions
      </p>

      <label className="mt-6 block text-sm font-medium text-slate-700">
        Name
      </label>
      <div className="relative mt-1">
        <User size={16} className="absolute left-3 top-3 text-medical-muted" />
        <input
          className="input-field pl-9"
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </div>

      <label className="mt-4 block text-sm font-medium text-slate-700">
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
          minLength={8}
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

      <button
        type="submit"
        className="btn-primary mt-6 w-full justify-center"
        disabled={loading}
      >
        {loading ? <Spinner label="Creating account..." /> : "Create Account"}
      </button>

      <p className="mt-4 text-sm text-slate-600">
        Already have an account?{" "}
        <Link to="/login" className="text-navy-700 hover:underline">
          Sign in
        </Link>
      </p>

      {error && (
        <p className="mt-3 rounded-input border border-emergency-border bg-emergency-bg p-2 text-sm text-emergency-text">
          {error}
        </p>
      )}
    </form>
  );
}
