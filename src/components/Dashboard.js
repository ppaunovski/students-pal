import React from "react";
import Forum from "./Forum";
import { Stack, Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Rightbar from "./Rightbar";
import Navbar from "./Navbar";

export default function Dashboard() {
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
