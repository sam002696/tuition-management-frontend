import { Link, useLocation } from "react-router";

export default function Error401() {
  const from = useLocation()?.state?.from?.pathname ?? "/";
  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold">401 — Unauthorized</h1>
        <p className="mt-3 text-gray-600">
          You need to sign in to view this page.
        </p>
        <div className="mt-6 flex gap-3 justify-center">
          <Link to="/login" className="px-4 py-2 rounded bg-black text-white">
            Go to Login
          </Link>
          <Link to={from} className="px-4 py-2 rounded border">
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
}
