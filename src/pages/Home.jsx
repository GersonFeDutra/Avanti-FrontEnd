import React, { useEffect, useState } from "react";
import { Container, Alert } from "@mui/material";
import axios from "axios";
import Landing from "../components/Landing";
import KnowledgeSection from "../components/KnowledgeSection";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const Home = () => {
  const [skills, setSkills] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });

  const showMessage = (type, text) => {
    setMessage({ type, text });
  };

  const getErrorMessage = (error, fallbackMessage) => {
    return error?.response?.data?.message || error?.message || fallbackMessage;
  };

  const loadSkills = async () => {
    try {
      const { data } = await api.get("/skills");
      setSkills(data);
    } catch (error) {
      showMessage("error", getErrorMessage(error, "Erro ao buscar skills"));
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Landing />

      {message.text && (
        <Alert severity={message.type} sx={{ mb: 3 }}>
          {message.text}
        </Alert>
      )}

      <KnowledgeSection skills={skills} />
    </Container>
  );
};

export default Home;
