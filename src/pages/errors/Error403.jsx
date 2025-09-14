import { Link } from "react-router";

const homeByRole = (role) =>
  role === "teacher"
    ? "/dashboard"
    : role === "student"
    ? "/student-dashboard"
    : "/";

export default function Error403({ role = null }) {
  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold">403 — Forbidden</h1>
        <p className="mt-3 text-gray-600">
          You don’t have permission to access this page.
        </p>
        <div className="mt-6 flex gap-3 justify-center">
          <Link
            to={homeByRole(role)}
            className="px-4 py-2 rounded bg-black text-white"
          >
            Go to your dashboard
          </Link>
          <Link to="/" className="px-4 py-2 rounded border">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
