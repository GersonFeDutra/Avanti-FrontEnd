import React, { useEffect, useState } from "react";
import { Container, Alert } from "@mui/material";
import axios from "axios";
import PeopleForm from "../components/PeopleForm";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const People = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [editingPersonId, setEditingPersonId] = useState(null);

  const [personForm, setPersonForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    description: "",
  });

  const showMessage = (type, text) => {
    setMessage({ type, text });
  };

  const getErrorMessage = (error, fallbackMessage) => {
    return error?.response?.data?.message || error?.message || fallbackMessage;
  };

  const resetPersonForm = () => {
    setPersonForm({
      name: "",
      email: "",
      phoneNumber: "",
      description: "",
    });
    setEditingPersonId(null);
  };

  const loadPeople = async () => {
    const { data } = await api.get("/persons");
    setPeople(data);
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const handleSubmitPerson = async () => {
    try {
      setLoading(true);
      setMessage({ type: "", text: "" });

      const payload = {
        name: personForm.name,
        email: personForm.email,
        phoneNumber: personForm.phoneNumber,
        description: personForm.description,
      };

      if (editingPersonId) {
        await api.put(`/persons/${editingPersonId}`, payload);
      } else {
        await api.post("/persons", payload);
      }

      await loadPeople();
      resetPersonForm();
      showMessage(
        "success",
        editingPersonId ? "Pessoa atualizada" : "Pessoa criada",
      );
    } catch (error) {
      showMessage("error", getErrorMessage(error, "Erro ao salvar pessoa"));
    } finally {
      setLoading(false);
    }
  };

  const handleEditPerson = (person) => {
    setEditingPersonId(person.id);
    setPersonForm({
      name: person.name || "",
      email: person.email || "",
      phoneNumber: person.phoneNumber || "",
      description: person.description || "",
    });
  };

  return (
    <Container sx={{ py: 4 }}>
      {message.text && (
        <Alert severity={message.type} sx={{ mb: 3 }}>
          {message.text}
        </Alert>
      )}

      <PeopleForm
        people={people}
        form={personForm}
        setForm={setPersonForm}
        onSubmit={handleSubmitPerson}
        editingPersonId={editingPersonId}
        onCancelEdit={(person) => {
          if (person) {
            handleEditPerson(person);
          } else {
            resetPersonForm();
          }
        }}
        loading={loading}
      />
    </Container>
  );
};

export default People;
