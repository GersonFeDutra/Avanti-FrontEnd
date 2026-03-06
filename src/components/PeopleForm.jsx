import React from "react";
import {
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Stack,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const PeopleForm = ({
  people,
  form,
  setForm,
  onSubmit,
  editingPersonId,
  onCancelEdit,
  onDelete,
  loading,
}) => {
  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {editingPersonId ? "Editar Pessoa" : "Cadastro de Pessoas"}
      </Typography>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            size="small"
            label="Nome"
            value={form.name}
            onChange={handleChange("name")}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            size="small"
            label="Email"
            value={form.email}
            onChange={handleChange("email")}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            size="small"
            label="Telefone"
            value={form.phoneNumber}
            onChange={handleChange("phoneNumber")}
          />
        </Grid>

        <TextField
          fullWidth
          size="small"
          label="Descrição"
          value={form.description}
          onChange={handleChange("description")}
          multiline
          minRows={3}
        />
      </Grid>

      <Stack direction="row" spacing={2} mb={3}>
        <Button variant="contained" onClick={onSubmit} disabled={loading}>
          {editingPersonId ? "Salvar pessoa" : "Cadastrar pessoa"}
        </Button>

        {editingPersonId && (
          <Button variant="outlined" onClick={onCancelEdit}>
            Cancelar
          </Button>
        )}
      </Stack>

      <Stack spacing={1}>
        {people.map((person) => (
          <Box
            key={person.id}
            sx={{
              p: 1.5,
              border: "1px solid #ddd",
              borderRadius: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Box>
              <Typography fontWeight="bold">{person.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {person.email || "-"} | {person.phoneNumber || "-"}
              </Typography>
              <Typography variant="body2">
                {person.description || ""}
              </Typography>
            </Box>

            <Stack direction="row" spacing={1}>
              <Tooltip title="Editar">
                <IconButton size="small" onClick={() => onCancelEdit(person)}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Excluir">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => onDelete && onDelete(person.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>
        ))}

        {people.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            Nenhuma pessoa cadastrada
          </Typography>
        )}
      </Stack>
    </Paper>
  );
};

export default PeopleForm;
