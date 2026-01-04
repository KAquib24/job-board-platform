import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <div className="border rounded-lg p-5 bg-white hover:shadow-md transition">
      <h3 className="font-semibold text-lg">{job.title}</h3>
      <p className="text-sm text-gray-600">{job.company}</p>
      <p className="text-sm text-gray-500">{job.location}</p>

      <Link
        to={`/jobs/${job._id}`}
        className="inline-block mt-4 text-blue-600 text-sm font-medium"
      >
        View Details →
      </Link>
    </div>
  );
}
