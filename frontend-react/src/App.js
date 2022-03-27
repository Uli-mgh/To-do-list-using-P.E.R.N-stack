import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import TaskList from "./components/TaskList.jsx";
import TaskForm from "./components/TaskForm";
import Navbar from "./components/Navbar.jsx";

import { Container } from "@mui/material";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/tasks/new" element={<TaskForm />} />
            <Route path="/tasks/:id/edit" element={<TaskForm />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}
