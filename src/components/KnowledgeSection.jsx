import React from "react";
import { Paper, Typography, Box, Stack, Grid } from "@mui/material";

const KnowledgeSection = ({ skills }) => (
  <Paper sx={{ p: 3, mb: 3 }}>
    <Typography variant="h6" gutterBottom>
      Conhecimentos disponíveis
    </Typography>

    <Grid container direction="row" spacing={1} flexWrap="wrap">
      {skills.map((item) => (
        <Box
          key={item.id}
          sx={{
            px: 2,
            py: 1,
            border: "1px solid",
            borderColor: "info.light",
            borderRadius: 2,
            mb: 1,
          }}
        >
          <Typography variant="body2">
            {item.title} {item.category ? `- ${item.category}` : ""}
          </Typography>
        </Box>
      ))}

      {skills.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          Nenhuma skill cadastrada
        </Typography>
      )}
    </Grid>
  </Paper>
);

export default KnowledgeSection;
