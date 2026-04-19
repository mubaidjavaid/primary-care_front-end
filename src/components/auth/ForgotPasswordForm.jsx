import { useState } from "react";
import toast from "react-hot-toast";
import { authService } from "../../services/auth.service";

export default function ForgotPasswordForm() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    if (!email.trim()) {
      toast.error("Please enter email first");
      return;
    }
    setLoading(true);
    try {
      await authService.forgotPassword({ email: email.trim().toLowerCase() });
      setStep(2);
      toast.success("OTP sent. Check your email or server logs.");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp.trim()) {
      toast.error("Please enter OTP");
      return;
    }
    setLoading(true);
    try {
      await authService.verifyResetOtp({
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
      });
      setStep(3);
      toast.success("OTP verified. Set your new password.");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const reset = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await authService.resetPassword({ email, otp, newPassword: password });
      setStep(1);
      setEmail("");
      setOtp("");
      setPassword("");
      setConfirmPassword("");
      toast.success("Password updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mx-auto w-full max-w-md p-6">
      <p className="mb-4 text-sm font-semibold text-navy-700">Step {step}/3</p>
      {step === 1 && (
        <div className="space-y-4">
          <h1 className="font-display text-3xl">Forgot Password</h1>
          <input
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <button
            type="button"
            className="btn-primary w-full"
            onClick={sendOtp}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-4">
          <h1 className="font-display text-3xl">Enter OTP</h1>
          <input
            className="input-field"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            placeholder="6-digit OTP"
          />
          <button
            type="button"
            className="btn-primary w-full"
            onClick={verifyOtp}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      )}
      {step === 3 && (
        <div className="space-y-4">
          <h1 className="font-display text-3xl">Reset Password</h1>
          <input
            className="input-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password"
          />
          <input
            className="input-field"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
          />
          <button
            type="button"
            className="btn-primary w-full"
            onClick={reset}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Password"}
          </button>
        </div>
      )}
    </div>
  );
}
