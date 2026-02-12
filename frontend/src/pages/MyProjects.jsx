import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MyProjects() {
  const [projects, setProjects] = useState([]);

  const load = async () => {
    const res = await api.get("/projects/my");
    setProjects(res.data || []);
  };

  const updateProgress = async (id, value) => {
    await api.put(`/projects/${id}`, { progress: value });
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Projects</h2>

      {projects.map((p) => (
        <div
          key={p._id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <p>Status: {p.status}</p>
          <p>Progress: {p.progress}%</p>

          <input
            type="range"
            min="0"
            max="100"
            value={p.progress}
            onChange={(e) =>
              updateProgress(p._id, Number(e.target.value))
            }
          />
        </div>
      ))}
    </div>
  );
}
