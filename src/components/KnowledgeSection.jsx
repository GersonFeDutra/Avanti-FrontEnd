import React from "react";
import {
  Paper,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const KnowledgeSection = ({ skills = [] }) => {
  const [activeSkill, setActiveSkill] = React.useState(null);

  const grouped = skills.reduce((acc, s) => {
    const cat = s.category || "Sem categoria";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  const handleOpen = (skill) => setActiveSkill(skill);
  const handleClose = () => setActiveSkill(null);

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Conhecimentos disponíveis
      </Typography>

      {categories.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          Nenhuma skill cadastrada
        </Typography>
      )}

      {categories.map((cat) => (
        <Accordion key={cat} sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 600 }}>{cat}</Typography>
            <Chip label={grouped[cat].length} size="small" sx={{ ml: 2 }} />
          </AccordionSummary>

          <AccordionDetails>
            <Grid container spacing={1}>
              {grouped[cat].map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={4}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => handleOpen(item)}
                    sx={{
                      justifyContent: "flex-start",
                      textTransform: "none",
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      borderColor: "info.light",
                    }}
                  >
                    <Typography variant="body2" sx={{ color: "text.primary" }}>
                      {item.title}
                    </Typography>
                  </Button>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}

      <Dialog
        fullWidth
        maxWidth="sm"
        open={!!activeSkill}
        onClose={handleClose}
      >
        <DialogTitle>{activeSkill?.title}</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {activeSkill?.description || "Sem descrição"}
          </Typography>
          <Typography variant="body2">
            <strong>Categoria:</strong>{" "}
            {activeSkill?.category || "Sem categoria"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default KnowledgeSection;
