import { Link } from "react-router";
export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold">404 — Not Found</h1>
        <p className="mt-3 text-gray-600">
          The page you’re looking for doesn’t exist.
        </p>
        <div className="mt-6">
          <Link to="/" className="px-4 py-2 rounded bg-black text-white">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
