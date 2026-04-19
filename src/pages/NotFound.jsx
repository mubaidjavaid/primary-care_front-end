import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="text-center">
        <h1 className="font-display text-6xl">404</h1>
        <p className="mt-2 text-sm text-medical-muted">Page not found.</p>
        <Link to="/triage" className="btn-primary mt-4 inline-flex">
          Go to Triage
        </Link>
      </div>
    </div>
  );
}
