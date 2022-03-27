import React from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Box,
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                PERN Stack
              </Link>
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/tasks/new")}
            >
              New Task
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
