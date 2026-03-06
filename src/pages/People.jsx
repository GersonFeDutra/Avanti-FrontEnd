import React, { useEffect, useState } from "react";
import {
  Container,
  Alert,
  Typography,
  Box,
  Button,
  Stack,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import PeopleForm from "../components/PeopleForm";
import PersonDetailModal from "../components/PersonDetailModal";

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
  const [selectedPersonId, setSelectedPersonId] = useState(null);
  const [personSkills, setPersonSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [skillAssign, setSkillAssign] = useState({
    skillId: "",
    level: "Intermediate",
  });

  const [personForm, setPersonForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    description: "",
  });
  const [confirmDelete, setConfirmDelete] = useState(null);

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

  const loadAllSkills = async () => {
    const { data } = await api.get("/skills");
    setAllSkills(data);
  };

  const loadPersonSkills = async (personId) => {
    if (!personId) return setPersonSkills([]);
    const { data } = await api.get(`/persons/${personId}/skills`);
    // data is array of personSkill including skill
    setPersonSkills(data);
  };

  useEffect(() => {
    loadPeople();
    loadAllSkills();
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
    if (typeof window !== "undefined" && window.scrollTo) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleDeletePerson = async (personId) => {
    try {
      setLoading(true);
      setMessage({ type: "", text: "" });
      await api.delete(`/persons/${personId}`);
      await loadPeople();
      showMessage("success", "Pessoa excluída");
    } catch (err) {
      showMessage("error", getErrorMessage(err, "Erro ao excluir pessoa"));
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPerson = async (person) => {
    setSelectedPersonId(person.id);
    await loadPersonSkills(person.id);
  };

  const handleAssignSkill = async () => {
    try {
      setLoading(true);
      await api.post(`/persons/${selectedPersonId}/skills`, {
        skillId: Number(skillAssign.skillId),
        level: skillAssign.level,
      });
      await loadPersonSkills(selectedPersonId);
      showMessage("success", "Skill atribuída");
    } catch (err) {
      showMessage("error", getErrorMessage(err, "Erro ao atribuir skill"));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePersonSkill = async (skillId, level) => {
    try {
      setLoading(true);
      await api.put(`/persons/${selectedPersonId}/skills/${skillId}`, {
        level,
      });
      await loadPersonSkills(selectedPersonId);
      showMessage("success", "Nível atualizado");
    } catch (err) {
      showMessage("error", getErrorMessage(err, "Erro ao atualizar nível"));
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePersonSkill = async (skillId) => {
    try {
      setLoading(true);
      await api.delete(`/persons/${selectedPersonId}/skills/${skillId}`);
      await loadPersonSkills(selectedPersonId);
      showMessage("success", "Skill removida");
    } catch (err) {
      showMessage("error", getErrorMessage(err, "Erro ao remover skill"));
    } finally {
      setLoading(false);
    }
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
        onDelete={(id) =>
          setConfirmDelete({
            id,
            name: people.find((p) => p.id === id)?.name || "",
          })
        }
        loading={loading}
      />

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Gerenciar skills por pessoa
        </Typography>

        <Stack spacing={2}>
          {people.map((p) => (
            <Box
              key={p.id}
              sx={{ display: "flex", gap: 1, alignItems: "center" }}
            >
              <Typography sx={{ flex: 1 }}>{p.name}</Typography>
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleSelectPerson(p)}
              >
                Gerenciar skills
              </Button>

              <Tooltip title="Editar">
                <IconButton size="small" onClick={() => handleEditPerson(p)}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Excluir">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => setConfirmDelete({ id: p.id, name: p.name })}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          ))}
        </Stack>
      </Paper>

      <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)}>
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent dividers>
          <Typography>
            Tem certeza que deseja excluir{" "}
            <strong>{confirmDelete?.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(null)}>Cancelar</Button>
          <Button
            color="error"
            onClick={async () => {
              if (confirmDelete) {
                await handleDeletePerson(confirmDelete.id);
                setConfirmDelete(null);
              }
            }}
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      <PersonDetailModal
        open={!!selectedPersonId}
        person={people.find((pp) => pp.id === selectedPersonId)}
        onClose={() => setSelectedPersonId(null)}
        allSkills={allSkills}
        personSkills={personSkills}
        skillAssign={skillAssign}
        setSkillAssign={setSkillAssign}
        onAssignSkill={handleAssignSkill}
        onUpdatePersonSkill={handleUpdatePersonSkill}
        onDeletePersonSkill={handleDeletePersonSkill}
      />
    </Container>
  );
};

export default People;
