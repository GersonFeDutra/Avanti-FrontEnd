import React from "react";
import {
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const SkillsList = ({ skills, onEdit, onDelete, loadingDeleteId }) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Lista de Skills
      </Typography>

      <Grid
        container
        spacing={3}
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      >
        {skills.map((skill) => (
          <Grid item xs={12} md={6} key={skill.id}>
            <Card
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{skill.title}</Typography>

                <Typography variant="body2" color="text.secondary" mb={1}>
                  {skill.description || "-"}
                </Typography>

                <Typography variant="body2">
                  <strong>Categoria:</strong> {skill.category || "-"}
                </Typography>
              </CardContent>

              <Stack
                direction="row"
                spacing={1}
                sx={{ p: 2, pt: 0, justifyContent: "flex-end" }}
              >
                <Tooltip title="Editar">
                  <IconButton
                    size="small"
                    onClick={() => onEdit(skill)}
                    aria-label="editar"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Excluir">
                  <IconButton
                    size="small"
                    onClick={() => onDelete(skill.id)}
                    aria-label="excluir"
                    color="error"
                    disabled={loadingDeleteId === skill.id}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Card>
          </Grid>
        ))}

        {skills.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              Nenhuma skill cadastrada
            </Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default SkillsList;
