import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const Navigation = ({ mode = "light", toggleTheme = () => {} }) => {
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
        >
          Base de Conhecimentos 🌏
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 0.5, sm: 2 }}
          alignItems="center"
        >
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              color: location.pathname === "/" ? "secondary.main" : "inherit",
              width: { xs: "100%", sm: "auto" },
              justifyContent: { xs: "flex-start", sm: "center" },
            }}
          >
            Início
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/pessoas"
            sx={{
              color:
                location.pathname === "/pessoas" ? "secondary.main" : "inherit",
              width: { xs: "100%", sm: "auto" },
              justifyContent: { xs: "flex-start", sm: "center" },
            }}
          >
            Pessoas
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/skills"
            sx={{
              color:
                location.pathname === "/skills" ? "secondary.main" : "inherit",
              width: { xs: "100%", sm: "auto" },
              justifyContent: { xs: "flex-start", sm: "center" },
            }}
          >
            Skills
          </Button>
          <Tooltip
            title={
              mode === "light" ? "Ativar tema escuro" : "Ativar tema claro"
            }
          >
            <IconButton color="inherit" onClick={toggleTheme} sx={{ ml: 1 }}>
              {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
