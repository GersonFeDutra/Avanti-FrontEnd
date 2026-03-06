import React, { useEffect, useState } from "react";
import { Container, Alert } from "@mui/material";
import axios from "axios";
import SkillsForm from "../components/SkillsForm";
import SkillsList from "../components/SkillsList";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const Skills = () => {
  const [people, setPeople] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDeleteId, setLoadingDeleteId] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [editingSkillId, setEditingSkillId] = useState(null);

  const [skillForm, setSkillForm] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    personId: "",
  });

  const showMessage = (type, text) => {
    setMessage({ type, text });
  };

  const getErrorMessage = (error, fallbackMessage) => {
    return error?.response?.data?.message || error?.message || fallbackMessage;
  };

  const resetSkillForm = () => {
    setSkillForm({
      title: "",
      description: "",
      category: "",
      level: "",
      personId: "",
    });
    setEditingSkillId(null);
  };

  const loadPeople = async () => {
    const { data } = await api.get("/persons");
    setPeople(data);
  };

  const loadSkills = async () => {
    const { data } = await api.get("/skills");
    setSkills(data);
  };

  const loadAll = async () => {
    try {
      setLoading(true);
      await Promise.all([loadPeople(), loadSkills()]);
    } catch (error) {
      showMessage("error", getErrorMessage(error, "Erro ao buscar dados"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleSubmitSkill = async () => {
    try {
      setLoading(true);
      setMessage({ type: "", text: "" });

      const payload = {
        title: skillForm.title,
        description: skillForm.description,
        category: skillForm.category,
        level: skillForm.level,
        personId: Number(skillForm.personId),
      };

      if (editingSkillId) {
        await api.put(`/skills/${editingSkillId}`, payload);
      } else {
        await api.post("/skills", payload);
      }

      await loadSkills();
      resetSkillForm();
      showMessage(
        "success",
        editingSkillId ? "Skill atualizada" : "Skill criada",
      );
    } catch (error) {
      showMessage("error", getErrorMessage(error, "Erro ao salvar skill"));
    } finally {
      setLoading(false);
    }
  };

  const handleEditSkill = (skill) => {
    setEditingSkillId(skill.id);
    setSkillForm({
      title: skill.title || "",
      description: skill.description || "",
      category: skill.category || "",
      level: skill.level || "",
      personId: skill.personId || "",
    });
  };

  const handleDeleteSkill = async (id) => {
    try {
      setLoadingDeleteId(id);
      setMessage({ type: "", text: "" });

      await api.delete(`/skills/${id}`);

      await loadSkills();
      showMessage("success", "Skill excluída");
    } catch (error) {
      showMessage("error", getErrorMessage(error, "Erro ao excluir skill"));
    } finally {
      setLoadingDeleteId(null);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      {message.text && (
        <Alert severity={message.type} sx={{ mb: 3 }}>
          {message.text}
        </Alert>
      )}

      <SkillsForm
        people={people}
        form={skillForm}
        setForm={setSkillForm}
        onSubmit={handleSubmitSkill}
        editingSkillId={editingSkillId}
        onCancelEdit={resetSkillForm}
        loading={loading}
      />

      <SkillsList
        skills={skills}
        people={people}
        onEdit={handleEditSkill}
        onDelete={handleDeleteSkill}
        loadingDeleteId={loadingDeleteId}
      />
    </Container>
  );
};

export default Skills;
