import React from "react";
import {
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
} from "@mui/material";

const SkillsList = ({ skills, people, onEdit, onDelete, loadingDeleteId }) => {
  const getPersonName = (personId) => {
    const person = people.find((item) => Number(item.id) === Number(personId));
    return person ? person.name : `Pessoa ${personId}`;
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Lista de Skills
      </Typography>

      <Grid
        container
        justifyContent="flex-start"
        spacing={3}
        alignContent="space-between"
      >
        {skills.map((skill) => (
          <Grid
            item
            xs={12}
            md={6}
            key={skill.id}
            sx={{ flexGrow: 1, flexBasis: 0, maxWidth: 400, minWidth: 250 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6">{skill.title}</Typography>

                <Typography variant="body2" color="text.secondary" mb={1}>
                  {skill.description || "-"}
                </Typography>

                <Typography variant="body2">
                  <strong>Categoria:</strong> {skill.category || "-"}
                </Typography>

                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" onClick={() => onEdit(skill)}>
                    Editar
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => onDelete(skill.id)}
                    disabled={loadingDeleteId === skill.id}
                  >
                    Excluir
                  </Button>
                </Stack>
              </CardContent>
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
