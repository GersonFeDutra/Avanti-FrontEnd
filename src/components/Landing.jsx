import React from "react";
import { Paper, Typography } from "@mui/material";

const Landing = () => (
  <Paper sx={{ p: 4, mb: 3 }}>
    <Typography variant="h4" fontWeight="bold" gutterBottom>
      Base de Conhecimentos
    </Typography>
    <Typography variant="body1" color="text.secondary">
      Aqui você poderá gerenciar e compartilhar conhecimentos com outras pessoas
      da Avanti e outras comunidades.
    </Typography>
  </Paper>
);

export default Landing;
