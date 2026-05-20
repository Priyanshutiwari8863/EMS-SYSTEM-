import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";

export default function ProjectTasks() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load project details and tasks
  const loadData = async () => {
    try {
      // Fetch project details
      const projectRes = await api.get(`/projects/${id}`);
      setProject(projectRes.data);

      // Fetch project tasks
      const taskRes = await api.get(`/tasks/${id}`);
      const taskData =
        taskRes.data.records ||
        taskRes.data.tasks ||
        taskRes.data.data ||
        taskRes.data ||
        [];

      setTasks(taskData);
    } catch (error) {
      console.error("Project Tasks Error:", error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  // Mark task as completed
  const markDone = async (taskId) => {
    try {
      await api.put(`/tasks/${taskId}`, {
        status: "completed",
      });

      // Reload updated tasks
      loadData();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  // Calculate progress
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const totalTasks = tasks.length;

  const progress =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

  // Dynamic color for progress
  const getProgressColor = () => {
    if (progress === 100) return "#10b981"; // green
    if (progress >= 50) return "#3b82f6"; // blue
    if (progress >= 25) return "#f59e0b"; // orange
    return "#ef4444"; // red
  };

  if (loading) {
    return (
      <div
        style={{
          padding: "32px",
          background: "#f8fafc",
          minHeight: "100vh",
        }}
      >
        <h2>Project Tasks</h2>
        <p>Loading tasks...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "32px",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "2.2rem",
            fontWeight: "800",
            color: "#111827",
          }}
        >
          📋 {project?.title || "Project Tasks"}
        </h1>

        <p
          style={{
            marginTop: "8px",
            color: "#6b7280",
            fontSize: "1rem",
          }}
        >
          Manage and track assigned project tasks
        </p>
      </div>

      {/* Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {/* Total Tasks */}
        <div
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
          }}
        >
          <p style={{ margin: 0, color: "#6b7280" }}>
            Total Tasks
          </p>
          <h3
            style={{
              margin: "8px 0 0",
              fontSize: "2rem",
              color: "#111827",
            }}
          >
            {totalTasks}
          </h3>
        </div>

        {/* Completed Tasks */}
        <div
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
          }}
        >
          <p style={{ margin: 0, color: "#6b7280" }}>
            Completed
          </p>
          <h3
            style={{
              margin: "8px 0 0",
              fontSize: "2rem",
              color: "#10b981",
            }}
          >
            {completedTasks}
          </h3>
        </div>

        {/* Progress */}
        <div
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
          }}
        >
          <p style={{ margin: 0, color: "#6b7280" }}>
            Progress
          </p>
          <h3
            style={{
              margin: "8px 0 0",
              fontSize: "2rem",
              color: getProgressColor(),
            }}
          >
            {progress}%
          </h3>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          background: "#ffffff",
          padding: "24px",
          borderRadius: "20px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            height: "12px",
            background: "#e5e7eb",
            borderRadius: "999px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: getProgressColor(),
              borderRadius: "999px",
              transition: "all 0.4s ease",
            }}
          />
        </div>
      </div>

      {/* Task List */}
      {tasks.length === 0 ? (
        <div
          style={{
            background: "#ffffff",
            padding: "40px",
            borderRadius: "20px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
            textAlign: "center",
            color: "#6b7280",
          }}
        >
          No tasks assigned to this project.
        </div>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            style={{
              background: "#ffffff",
              padding: "24px",
              marginBottom: "16px",
              borderRadius: "20px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
              borderLeft: `6px solid ${
                task.status === "completed"
                  ? "#10b981"
                  : "#f59e0b"
              }`,
            }}
          >
            <h3
              style={{
                margin: "0 0 10px",
                fontSize: "1.2rem",
                fontWeight: "700",
                color: "#111827",
              }}
            >
              {task.title}
            </h3>

            <p
              style={{
                margin: "0 0 12px",
                color: "#6b7280",
                lineHeight: "1.6",
              }}
            >
              {task.description || "No description provided."}
            </p>

            <p
              style={{
                marginBottom: "16px",
                fontWeight: "600",
                color:
                  task.status === "completed"
                    ? "#10b981"
                    : "#f59e0b",
              }}
            >
              Status:{" "}
              {task.status === "completed"
                ? "Completed"
                : "Pending"}
            </p>

            {task.status !== "completed" && (
              <button
                onClick={() => markDone(task._id)}
                style={{
                  background: "#4f46e5",
                  color: "#ffffff",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "0.95rem",
                }}
              >
                Mark as Completed
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}