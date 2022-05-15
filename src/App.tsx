import React, { useState } from "react";
import logo from "./logo.svg";
import Header from "./components/Header";
import WorkloadList from "./pages/WorkloadList";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { AuthProvider } from "./auth/AuthProvider";
import {  Route } from "react-router-dom";
import "./reset.css";
import Login from "./pages/Login";
import { useAuth } from "./auth/AuthProvider";
import {Routes} from "./auth/Routes"
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
      <Routes></Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
