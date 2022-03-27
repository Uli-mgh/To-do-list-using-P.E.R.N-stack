//Hooks
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

//Material UI
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

export default function TaskForm() {
  const navigate = useNavigate();
  const params = useParams();

  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (edit) {
      const res = await fetch(`http://localhost:5000/tasks/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
    } else {
      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });
    }

    setLoading(false);
    navigate("/");
  };

  const handlechange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const loadTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    setTask({ title: data.title, description: data.description });
    setEdit(true);
  };

  useEffect(() => {
    if (params.id) {
      loadTask(params.id);
    }
  }, [params.id]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 5 }}
          style={{
            backgroundColor: "  #d6eaf8",
            padding: "1rem",
          }}
        >
          <Typography variant="3" textAlign="center" color="white">
            {edit ? "Edit Task" : "Add Task"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Task Title"
                name="title"
                value={task.title}
                onChange={handlechange}
                sx={{ display: "block", margin: ".5rem 0" }}
                inputProps={{ style: { color: "#1b4f72" } }}
                InputLabelProps={{ style: { color: " #1b4f72" } }}
              />

              <TextField
                variant="filled"
                label="Task Description"
                name="description"
                value={task.description}
                onChange={handlechange}
                multiline
                rows={4}
                sx={{ display: "block", margin: ".5rem 0" }}
                inputProps={{ style: { color: "#1b4f72" } }}
                InputLabelProps={{ style: { color: " #1b4f72" } }}
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!task.title || !task.description}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Save"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
