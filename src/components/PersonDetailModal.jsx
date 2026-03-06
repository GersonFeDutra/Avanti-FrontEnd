import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Stack,
  Select,
  MenuItem,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const levelOptions = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
  "Specialized",
];

export default function PersonDetailModal({
  open,
  person,
  onClose,
  allSkills,
  personSkills,
  skillAssign,
  setSkillAssign,
  onAssignSkill,
  onUpdatePersonSkill,
  onDeletePersonSkill,
}) {
  if (!person) return null;

  const availableSkills = allSkills.filter(
    (s) => !personSkills.some((ps) => ps.skill.id === s.id),
  );

  React.useEffect(() => {
    if (skillAssign.skillId && !availableSkills.some((s) => s.id === skillAssign.skillId)) {
      setSkillAssign((prev) => ({ ...prev, skillId: "" }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personSkills, allSkills]);

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span>Gerenciar skills — {person.name}</span>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Atribuir nova skill
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
          <Select
            size="small"
            value={skillAssign.skillId}
            onChange={(e) => setSkillAssign(prev => ({ ...prev, skillId: e.target.value }))}
            displayEmpty
            sx={{ minWidth: 160 }}
          >
            <MenuItem value="">Selecione uma skill</MenuItem>
            {availableSkills.length === 0 ? (
              <MenuItem value="" disabled>Sem skills disponíveis</MenuItem>
            ) : (
              availableSkills.map((s) => (
                <MenuItem key={s.id} value={s.id}>{s.title}</MenuItem>
              ))
            )}
          </Select>

          <Select
            size="small"
            value={skillAssign.level}
            onChange={(e) => setSkillAssign(prev => ({ ...prev, level: e.target.value }))}
          >
            {levelOptions.map((lv) => (
              <MenuItem key={lv} value={lv}>{lv}</MenuItem>
            ))}
          </Select>

          <Button variant="contained" onClick={onAssignSkill} disabled={!skillAssign.skillId}>
            Atribuir
          </Button>
        </Box>

        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Skills atribuídas
        </Typography>

        <Stack spacing={1}>
          {personSkills.length === 0 && (
            <Typography variant="body2" color="text.secondary">Nenhuma skill atribuída</Typography>
          )}

          {personSkills.map((ps) => (
            <Box key={ps.skill.id} sx={{ p:1, border: '1px solid #eee', borderRadius:1, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <Box>
                <Typography fontWeight="600">{ps.skill.title}</Typography>
                <Typography variant="body2">Nível: {ps.level}</Typography>
              </Box>

              <Stack direction="row" spacing={1}>
                <Select size="small" value={ps.level} onChange={(e) => onUpdatePersonSkill(ps.skill.id, e.target.value)}>
                  {levelOptions.map(lv => (
                    <MenuItem key={lv} value={lv}>{lv}</MenuItem>
                  ))}
                </Select>
                <Button size="small" color="error" onClick={() => onDeletePersonSkill(ps.skill.id)}>Remover</Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}
