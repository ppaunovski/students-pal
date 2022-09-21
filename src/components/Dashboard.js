import React, { useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import {
  Link,
  useNavigate,
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Navigation from "./Navigation";
import Profile from "./Profile";
import Forum from "./Forum";
import Semesters from "./Semesters";
import { Stack, Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Rightbar from "./Rightbar";
import Navbar from "./Navbar";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to Log Out!");
    }
  }

  return (
    <Box>
      <Navbar />
      <Stack direction="row" justifyContent="space-between" gap={2}>
        <Sidebar />
        <Forum />
        <Rightbar />
      </Stack>
    </Box>
  );
}
