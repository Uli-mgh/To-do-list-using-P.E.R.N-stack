import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Card, CardContent, Typography, Button } from "@mui/material";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const loadTask = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    loadTask();
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleUp = async (id) => {};

  return (
    <>
      <h1>Tasks List</h1>
      {tasks.map((tarea) => (
        <Card
          style={{
            marginBottom: ".7rem",
            backgroundColor: "  #aed6f1  ",
          }}
          key={tarea.id}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Typography> {tarea.title} </Typography>
              <Typography> {tarea.description} </Typography>
            </div>
            <div>
              <Button
                variant="contained"
                color="success"
                onClick={() => navigate(`tasks/${tarea.id}/edit`)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(tarea.id)}
                style={{
                  marginLeft: ".5rem",
                }}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
