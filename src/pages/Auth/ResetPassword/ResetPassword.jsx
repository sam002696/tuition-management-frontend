import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams, Link } from "react-router";

import resetIllustration from "../../../assets/images/auth/reset_password.png";
import { resetPasswordClear } from "../../../slices/Auth/authSlice";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token: tokenParam, email: emailParam } = useParams();
  const [searchParams] = useSearchParams();

  //here Supporting both query (?token&email) and path params (/reset-password/:token/:email)
  const token = useMemo(
    () => searchParams.get("token") || tokenParam || "",
    [searchParams, tokenParam]
  );
  const email = useMemo(
    () => searchParams.get("email") || emailParam || "",
    [searchParams, emailParam]
  );

  const { resetLoading, resetError, resetSuccess } = useSelector((s) => s.auth);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [localErr, setLocalErr] = useState("");

  useEffect(() => {
    // cleanup on unmount
    return () => dispatch(resetPasswordClear());
  }, [dispatch]);

  const validate = () => {
    if (!token || !email) return "Invalid or missing reset link.";
    if (!password || password.length < 6)
      return "Password must be at least 6 characters.";
    if (password !== confirm) return "Passwords do not match.";
    return "";
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setLocalErr(v);
      return;
    }
    setLocalErr("");
    dispatch({
      type: "RESET_PASSWORD",
      payload: {
        body: {
          email,
          token,
          password,
          password_confirmation: confirm,
        },
        navigate, // saga will redirect to /login on success
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Card */}
        <div className="order-2 md:order-1 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-900">
              Reset your password
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Enter a new password for{" "}
              <span className="font-semibold">{email || "your account"}</span>.
            </p>
          </div>

          {/* Link error */}
          {!token || !email ? (
            <div className="rounded-lg border border-rose-200 bg-rose-50 text-rose-700 px-3 py-2 text-sm mb-4">
              Invalid reset link. Please request a new one from{" "}
              <Link to="/forgot-password" className="underline font-medium">
                Forgot Password
              </Link>
              .
            </div>
          ) : null}

          {/* Errors */}
          {localErr ? (
            <div className="rounded-lg border border-amber-200 bg-amber-50 text-amber-800 px-3 py-2 text-sm mb-4">
              {localErr}
            </div>
          ) : null}
          {resetError ? (
            <div className="rounded-lg border border-rose-200 bg-rose-50 text-rose-700 px-3 py-2 text-sm mb-4">
              {resetError}
            </div>
          ) : null}
          {resetSuccess ? (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 px-3 py-2 text-sm mb-4">
              Password reset successful. Redirecting to login…
            </div>
          ) : null}

          <form onSubmit={onSubmit} className="space-y-4">
            {/* New password */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  className="w-full rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none px-4 py-3 text-[15px]"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPwd ? "Hide" : "Show"}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 6 characters.
              </p>
            </div>

            {/* Confirm */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  className="w-full rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none px-4 py-3 text-[15px]"
                  placeholder="Re-enter new password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirm ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={resetLoading || !token || !email}
              className="w-full h-12 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:bg-gray-400 transition cursor-pointer disabled:cursor-not-allowed"
            >
              {resetLoading ? "Changing…" : "Change Password"}
            </button>

            <div className="text-center">
              <Link
                to="/login"
                className="text-sm text-gray-600 hover:text-gray-800 underline"
              >
                Back to login
              </Link>
            </div>
          </form>
        </div>

        {/* Right: Illustration */}
        <div className="order-1 md:order-2 flex items-center justify-center">
          <img
            src={resetIllustration}
            alt="Reset password illustration"
            className="w-full max-w-md object-contain drop-shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
