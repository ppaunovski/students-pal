import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Forum from "./Forum";
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
