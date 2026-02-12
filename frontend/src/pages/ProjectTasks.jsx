import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";

export default function ProjectTasks() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);

  const load = async () => {
    const res = await api.get(`/tasks/${id}`);
    setTasks(res.data || []);
  };

  const markDone = async (taskId) => {
    await api.put(`/tasks/${taskId}`, {
      status: "completed",
    });
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Project Tasks</h2>

      {tasks.map((t) => (
        <div
          key={t._id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h4>{t.title}</h4>
          <p>{t.description}</p>
          <p>Status: {t.status}</p>

          {t.status !== "completed" && (
            <button onClick={() => markDone(t._id)}>
              Mark Complete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
