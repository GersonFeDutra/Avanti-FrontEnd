import React from "react";
import {
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";

const SkillsForm = ({
  people,
  form,
  setForm,
  onSubmit,
  editingSkillId,
  onCancelEdit,
  loading,
}) => {
  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {editingSkillId ? "Editar Skill" : "Cadastro de Ofertas / Skills"}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Select
            fullWidth
            size="small"
            displayEmpty
            value={form.personId}
            onChange={handleChange("personId")}
          >
            <MenuItem value="">Selecione uma pessoa</MenuItem>
            {people.map((person) => (
              <MenuItem key={person.id} value={person.id}>
                {person.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            size="small"
            label="Título"
            value={form.title}
            onChange={handleChange("title")}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            size="small"
            label="Categoria"
            value={form.category}
            onChange={handleChange("category")}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            size="small"
            label="Nível"
            value={form.level}
            onChange={handleChange("level")}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            size="small"
            label="Descrição"
            value={form.description}
            onChange={handleChange("description")}
          />
        </Grid>
      </Grid>

      <Stack direction="row" spacing={2} mt={2}>
        <Button variant="contained" onClick={onSubmit} disabled={loading}>
          {editingSkillId ? "Salvar skill" : "Criar skill"}
        </Button>

        {editingSkillId && (
          <Button variant="outlined" onClick={onCancelEdit}>
            Cancelar
          </Button>
        )}
      </Stack>
    </Paper>
  );
};

export default SkillsForm;
