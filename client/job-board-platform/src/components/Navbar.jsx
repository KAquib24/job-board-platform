import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600">
          JobBoard
        </Link>

        <div className="flex gap-6 text-sm font-medium">
          <Link to="/jobs" className="hover:text-blue-600">
            Jobs
          </Link>
          <Link to="/login" className="hover:text-blue-600">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
