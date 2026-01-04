import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchJobById } from "../services/api";

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJobById(id).then((res) => setJob(res.data));
  }, [id]);

  if (!job) return <p className="p-6">Loading...</p>;

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
      <p className="text-gray-600 mb-4">
        {job.company} · {job.location}
      </p>
      <p className="leading-relaxed">{job.description}</p>
    </section>
  );
}
